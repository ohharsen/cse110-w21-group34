import * as Constants from './constants.js';
import * as Storage from './util/storage.js';
import { increaseTaskPomo, toggleTaskButtonDisabled } from './tasks.js';
import { updateStats } from './stats.js';

const STOP_TIMER_COLOR = 'var(--grey)';
const WORK_TIMER_COLOR = 'var(--red)';
const BREAK_TIMER_COLOR = 'var(--green)';
const COLORED_POT_SOURCE = 'images/honey-pot-color.svg';
const GRAY_POT_SOURCE = 'images/honey-pot-gray.svg';
const startStopButton = document.getElementById(Constants.START_STOP_ID);
const timerRing = document.getElementById('base-timer-path-remaining');
const countdownText = document.getElementById('countdownText');
const yesButton = document.getElementById('reset-yes-button');
const noButton = document.getElementById('reset-no-button');
const timeWorker = (window.Worker && !window.Cypress) ? new Worker('./scripts/timeWorker.js') : null;

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = Constants.timerOptions.STOPPED;
let onBreak = false;
let legacyInterval;
let firstReset = true; // Is rest being clicked for the first time

if (startStopButton) {
  startStopButton.classList.toggle('break-button');
  startStopButton.addEventListener('click', startResetController);
}

// Toggles countdown text on click
if (countdownText) {
  countdownText.addEventListener('click', () => {
    if (pomoState !== Constants.timerOptions.STOPPED) {
      if (countdownText.classList.contains('hover-text')) {
        countdownText.classList.remove('hover-text');
      } else {
        countdownText.classList.add('hover-text');
      }
    }
  });
}

/**
 * The callback for events that trigger the start or stop of timer
 */
export function startResetController () {
  if (pomoState === Constants.timerOptions.STOPPED) {
    startTimer();
  } else {
    resetPrompt();
  }
}

/* istanbul ignore next */
/**
 * Begins the timer countdown for a cycle
 * @param {Number} duration The duration of the countdown
 */
export function beginCountdown (duration) {
  duration--;
  displayTime(duration);
  const timerRingColor = (onBreak) ? BREAK_TIMER_COLOR : WORK_TIMER_COLOR;
  timerRing.setAttribute('stroke', timerRingColor);
  timerRing.setAttribute('stroke-dasharray', `${(timeFraction(duration, pomoState) * 220)} 220`);

  if (timeWorker) {
    timeWorker.onmessage = (e) => {
      if (pomoState === Constants.timerOptions.STOPPED) return;

      const { timeLeft } = e.data;
      displayTime(timeLeft);
      timerRing.setAttribute('stroke-dasharray', `${(timeFraction(timeLeft, pomoState) * 220)} 220`);
      if (timeLeft < 0) {
        stopTimer();
        hidePrompt();
        timeWorker.onmessage = undefined;
      }
    };

    const message = { start: true, duration: duration };
    timeWorker.postMessage(message);
  } else {
    setCountdownInterval(duration);
  }
}

/* istanbul ignore next */
/**
   * Begins the timer countdown for a cycle within the main thread for
   * browsers that do not support web-workers.
   * @param {Number} duration The duration of the countdown
   */
export function setCountdownInterval (duration) {
  let timer = duration;
  legacyInterval = setInterval(() => {
    --timer;
    displayTime(timer);
    timerRing.setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
    if (timer < 0) {
      clearInterval(legacyInterval);
      stopTimer();
    }
  }, 1000);
}

/**
   * Toggles break styling in start-stop-button
   * @param {Boolean} onBreak Boolean to check if the timer is on break
   * @return Negation of onBreak
   */
export function togglePomoBreak (onBreak) {
  if (startStopButton) {
    startStopButton.classList.toggle('break-button');
  }
  return !onBreak;
}

/**
 * Starts timer upon button click
 * @param {Boolean} localOnBreak Boolean to check if the timer is on break
 * @param {Number} localPomoCount Number storing which pomo the timer is ons
 * @return An array containing the pomoState and the pomoCount
 */
export function startTimer (localOnBreak = onBreak, localPomoCount = pomoCount) {
  toggleTaskButtonDisabled(true);

  const timerAudio = document.getElementById('timer-sound');
  if (!timerAudio.paused) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
  if (startStopButton) {
    startStopButton.innerHTML = Constants.RESET_BTN_TXT;

    if (!localOnBreak) {
      pomoState = Constants.timerOptions.POMO;
      beginCountdown(Constants.WORK_LENGTH);
    } else {
      if (localPomoCount === 4) {
        localPomoCount = 0;
        pomoCount = 0;
        pomoState = Constants.timerOptions.LONG;
        beginCountdown(Constants.LONG_BREAK);
      } else {
        localPomoCount++;
        pomoState = Constants.timerOptions.SHORT;
        beginCountdown(Constants.SHORT_BREAK);
      }
    }
  }
  return [pomoState, localPomoCount];
}

/**
 * Stops the timer and refreshes user interface
 */
function stopTimer () {
  pomoState = Constants.timerOptions.STOPPED;
  document.getElementById('timer-sound').play();
  // Mutes timer color
  timerRing.setAttribute('stroke', STOP_TIMER_COLOR);
  countdownText.classList.remove('hover-text');
  startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
  if (!onBreak) {
    pomoCount++;
    // Dispalys the next cycle without beginning it
    if (pomoCount === Constants.POMO_CYCLE_LENGTH) {
      displayTime(Constants.LONG_BREAK);
      timerTypeIndicator(Constants.timerOptions.LONG);
    } else {
      displayTime(Constants.SHORT_BREAK);
      timerTypeIndicator(Constants.timerOptions.SHORT);
    }

    // incrementing daily pomo cycle count
    Storage.incrPomoCount();
    increaseTaskPomo();
    updateStats();
  } else {
    // Displays the next cycle without beggining it
    displayTime(Constants.WORK_LENGTH);
    timerTypeIndicator(Constants.timerOptions.POMO);
  }
  updatePots();
  toggleTaskButtonDisabled(false);
  onBreak = togglePomoBreak(onBreak);
}

/**
 * Update pot icons to show number of pomos completed for the cycle
 */
export function updatePots () {
  for (let i = 1; i < pomoCount + 1; i++) {
    document.getElementById('pot' + i).src = COLORED_POT_SOURCE;
  }

  for (let i = pomoCount + 1; i <= Constants.POMO_CYCLE_LENGTH; i++) {
    document.getElementById('pot' + i).src = GRAY_POT_SOURCE;
  }
}

/**
   * Resets timer upon button click
   * @return An array containing the stopped timer state and begin button text
   */
export function resetTimer () {
  pomoState = Constants.timerOptions.STOPPED;
  toggleTaskButtonDisabled(true);

  if (startStopButton) {
    startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
    if (timeWorker) timeWorker.postMessage({ start: false });
    if (legacyInterval) clearInterval(legacyInterval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    countdownText.classList.remove('hover-text');
    timerRing.setAttribute('stroke', STOP_TIMER_COLOR);
    timerRing.setAttribute('stroke-dasharray', '220 220');
    displayTime(Constants.WORK_LENGTH);
    timerTypeIndicator(Constants.WORK_LENGTH);
  }

  Storage.incrInterruptions();
  updateStats();
  return [pomoState, Constants.BEGIN_BTN_TXT];
}

/*
 * Checks if the reset button has been pressed before. If yes then resets the timer directly, otherwise asks for confirmation.
 */
export function resetPrompt () {
  if (!firstReset) {
    resetTimer();
    return;
  }
  startStopButton.style.display = 'none';
  document.getElementById('prompt').style.display = 'flex';
  yesButton.disabled = false;
  noButton.disabled = false;
  yesButton.addEventListener('click', () => {
    resetConfirm(true);
  });
  noButton.addEventListener('click', () => {
    resetConfirm(false);
  });
}

/**
 * Function to hide the reset prompt
 * Called whenver the prompt is answered or a timer goes off
 */
export function hidePrompt () {
  startStopButton.style.display = '';
  document.getElementById('prompt').style.display = 'none';
  yesButton.disabled = true;
  noButton.disabled = true;
}

/*
 * Resets the timer if confirmation is true
 * @param {boolean} isConfirm True to reset timer, False otherwise
 */
export function resetConfirm (isConfirm) {
  hidePrompt();
  if (isConfirm) {
    resetTimer();
  }
  firstReset = false;
}

/**
 * Displays the amount of time remaining.
 * @param {Number} time The time to be displayed
 */
export function displayTime (time) {
  let minutes, seconds;
  minutes = parseInt(time / 60, 10);
  seconds = parseInt(time % 60, 10);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countdownText.textContent = minutes + ':' + seconds;
  return countdownText.textContent;
}

/**
 * Returns the fraction of the time remaining for the current countdown
 * @param {Number} timer The amont of time on the timer
 * @param {String} pomoState The current state of the pomodoro
 */
export function timeFraction (timer, pomoState) {
  if (pomoState === Constants.timerOptions.POMO) {
    return timer / Constants.WORK_LENGTH;
  } else if (pomoState === Constants.timerOptions.LONG) {
    return timer / Constants.LONG_BREAK;
  } else {
    return timer / Constants.SHORT_BREAK;
  }
}

/* istanbul ignore next */
/**
 * Displays the textual indicator of the current timer type
 * @param {String} type the timer type indicating work, long break, or short break
 */
export function timerTypeIndicator (type) {
  const workIndicator = document.getElementById('work-indicator');
  const longBreakIndicator = document.getElementById('long-break-indicator');
  const shortBreakIndicator = document.getElementById('short-break-indicator');

  workIndicator.classList.remove('highlight');
  longBreakIndicator.classList.remove('highlight');
  shortBreakIndicator.classList.remove('highlight');
  if (type === Constants.timerOptions.LONG) {
    longBreakIndicator.classList.add('highlight');
  } else if (type === Constants.timerOptions.SHORT) {
    shortBreakIndicator.classList.add('highlight');
  } else {
    workIndicator.classList.add('highlight');
  }
}