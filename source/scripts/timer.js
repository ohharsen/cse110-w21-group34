import * as Constants from './constants.js';
import * as Storage from './util/storage.js'
import { increaseTaskPomo, toggleTaskButtonDisabled } from './tasks.js';
import { updateStats } from './stats.js';

const STOP_TIMER_COLOR = 'var(--dark-orange)';
const WORK_TIMER_COLOR = 'var(--red)';
const BREAK_TIMER_COLOR = 'var(--green)';
const COLORED_POT_SOURCE = 'images/honey-pot-color.svg';
const GRAY_POT_SOURCE = 'images/honey-pot-gray.svg';
const startStopButton = document.getElementById(Constants.START_STOP_ID);
const countdownText = document.getElementById('countdownText');

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = Constants.timerOptions.STOPPED;
let onBreak = false;
let interval;

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
    resetTimer();
  }
}

/**
   * Begins the timer countdown for a cycle
   * @param {Number} duration The duration of the countdown
   * @param {Object} textDisplay The component on which the remaining time is outputted
   */
export function beginCountdown (duration, textDisplay) {
  let timer = duration; // minutes, seconds;
  currentTime(--timer, textDisplay);
  document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
  interval = setInterval(function () {
    --timer;
    currentTime(timer, textDisplay);
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
    if (timer < 0) {
      clearInterval(interval);
      document.getElementById('timer-sound').play();
      document.getElementById('countdownText').classList.remove('hover-text');
      startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
      pomoState = Constants.timerOptions.STOPPED;
      if (!onBreak) {
        pomoCount++;
        updatePots();
        // Changes the color of the timer
        document.getElementById('base-timer-path-remaining').setAttribute('stroke', BREAK_TIMER_COLOR);
        // Dispalys the next cycle without beginning it
        if (pomoCount === Constants.POMO_CYCLE_LENGTH) {
          currentTime(Constants.LONG_BREAK, textDisplay);
          timerTypeIndicator(Constants.timerOptions.LONG);
        } else {
          currentTime(Constants.SHORT_BREAK, textDisplay);
          timerTypeIndicator(Constants.timerOptions.SHORT);
        }

        // incrementing daily pomo cycle count
        Storage.incrPomoCount();
        increaseTaskPomo();
        updateStats();
      } else {
        updatePots();
        // Changes the color of the timer
        document.getElementById('base-timer-path-remaining').setAttribute('stroke', WORK_TIMER_COLOR);
        // Dispalys the next cycle without beggining it
        currentTime(Constants.WORK_LENGTH, textDisplay);
        timerTypeIndicator(Constants.timerOptions.POMO);
      }
      toggleTaskButtonDisabled(false);
      onBreak = togglePomoBreak(onBreak);
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

    const display = document.querySelector('#countdownText');
    if (!localOnBreak) {
      pomoState = Constants.timerOptions.POMO;
      beginCountdown(Constants.WORK_LENGTH, display);
    } else {
      if (localPomoCount === 4) {
        localPomoCount = 0;
        pomoCount = 0;
        pomoState = Constants.timerOptions.LONG;
        beginCountdown(Constants.LONG_BREAK, display);
      } else {
        localPomoCount++;
        pomoState = Constants.timerOptions.SHORT;
        beginCountdown(Constants.SHORT_BREAK, display);
      }
    }
  }
  return [pomoState, localPomoCount];
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
  const userConfirm = confirm('This action will count as a distraction.');
  if (!userConfirm) {
    return;
  }

  document.getElementById('countdownText').classList.remove('hover-text');
  pomoState = Constants.timerOptions.STOPPED;
  toggleTaskButtonDisabled(true);

  if (startStopButton) {
    startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
    clearInterval(interval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    currentTime(Constants.WORK_LENGTH, document.querySelector('#countdownText'));
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
    document.getElementById('base-timer-path-remaining').setAttribute('stroke', STOP_TIMER_COLOR);
    timerTypeIndicator(Constants.WORK_LENGTH);
  }

  Storage.incrDistractions();
  updateStats();
  return [pomoState, Constants.BEGIN_BTN_TXT];
}

/**
   * Displays the amount of time remaining
   * @param {Number} timer The time to be displayed
   * @param {Object} textDisplay The component on which the remaining time is displayed
   */
export function currentTime (timer, textDisplay) {
  let minutes, seconds;
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  textDisplay.textContent = minutes + ':' + seconds;
  return textDisplay.textContent;
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

/**
 * Displays the textual indicator of the current timer type
 * @param {String} type the timer type indicating work, long break, or short break
 */
export function timerTypeIndicator (type) {
  document.getElementById('work-indicator').style.borderStyle = 'hidden';
  document.getElementById('long-break-indicator').style.borderStyle = 'hidden';
  document.getElementById('short-break-indicator').style.borderStyle = 'hidden';
  if (type === Constants.timerOptions.LONG) {
    document.getElementById('long-break-indicator').style.borderStyle = 'solid';
  } else if (type === Constants.timerOptions.SHORT) {
    document.getElementById('short-break-indicator').style.borderStyle = 'solid';
  } else {
    document.getElementById('work-indicator').style.borderStyle = 'solid';
  }
}
