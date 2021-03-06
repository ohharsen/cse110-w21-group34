import * as Constants from './constants.js';
import { increaseTaskPomo, formatDate, toggleTaskButtonDisabled } from './taskButton.js';

const startStopButton = document.getElementById(Constants.START_STOP_ID);

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = Constants.timerOptions.STOPPED;
let onBreak = false;
let interval;

if (startStopButton) {
  startStopButton.classList.toggle('break-button');
  startStopButton.addEventListener('click', function () {
    if (pomoState === Constants.timerOptions.STOPPED) {
      startTimer();
    } else {
      resetTimer();
    }
  });
}

/* istanbul ignore next */
/**
   * Begins the countdown for a break cycle
   * @param {*} duration The duration of the countdown
   * @param {*} textDisplay The component on which the remaining time is outputted
   */
export function beginBreak (duration, textDisplay) {
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
      startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
      pomoState = Constants.timerOptions.STOPPED;
      onBreak = togglePomoBreak(onBreak);
      // Changes the color of the timer
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
      currentTime(Constants.stdWork, textDisplay);
    }
  }, 1000);
}

/* istanbul ignore next */
/**
   * Begins the countdown for a work cycle
   * @param {*} duration The duration of the countdown
   * @param {*} textDisplay The component on which the remaining time is outputted
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
      toggleTaskButtonDisabled(false);

      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#34DBB3');
      clearInterval(interval);
      document.getElementById('timer-sound').play();
      onBreak = togglePomoBreak(onBreak);
      startStopButton.innerHTML = Constants.BEGIN_BTN_TXT;
      pomoState = Constants.timerOptions.STOPPED;
      if (pomoCount === 3) {
        currentTime(Constants.stdExtBreak, textDisplay);
      } else {
        currentTime(Constants.stdBreak, textDisplay);
      }
      // current pomos cycles completed today
      const todayPomos = Number(window.localStorage.getItem(Constants.TODAY_POMO_ID));
      // Today's date
      const todayStorage = window.localStorage.getItem(Constants.TODAY_DATE_ID);
      // incrementing daily pomo cycle count
      updatePomoCount(todayPomos, todayStorage);
      increaseTaskPomo();
    }
  }, 1000);
}


/**
   * Update's pomo count for today in local storage
   * @param {Number} todayPomos The number of daily current pomos completed
   * @param {String} todayStorage updatePomoCount the local storage date for the current day
   * @return number of pomos completed today
   */
export function updatePomoCount (todayPomos, todayStorage) {
  // update pomo cycle day count
  const today = formatDate(new Date());
  // case if we are on same day
  if (today === todayStorage) {
    todayPomos++;
  } else { // case if we are on different day
    todayPomos = 1;
    window.localStorage.setItem(Constants.TODAY_DATE_ID, today);
  }
  window.localStorage.setItem(Constants.TODAY_POMO_ID, String(todayPomos));
  window.localStorage.setItem(Constants.TOTAL_POMO_ID, String(Number(window.localStorage.getItem(Constants.TOTAL_POMO_ID)) + 1));
  if (Number(window.localStorage.getItem(Constants.BEST_DAILY_POMO_ID)) < todayPomos) {
    window.localStorage.setItem(Constants.BEST_DAILY_POMO_ID, todayPomos);
  }
  return todayPomos;
}

/**
   * Toggles break styling in start-stop-button
   */
export function togglePomoBreak (onBreak) {
  if (startStopButton) {
    startStopButton.classList.toggle('break-button');
  }
  return !onBreak;
}

/**
   * Starts timer upon button click
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
      document.getElementById('cycle-pomo-counter').innerHTML = pomoCount + 1;
      beginCountdown(Constants.stdWork, display);
    } else {
      if (localPomoCount === 3) {
        pomoCount = 0;
        localPomoCount = 0;
        pomoState = Constants.timerOptions.LONG;
        beginBreak(Constants.stdExtBreak, display);
      } else {
        pomoCount++;
        localPomoCount++;
        pomoState = Constants.timerOptions.SHORT;
        beginBreak(Constants.stdBreak, display);
      }
    }
  }
  return [pomoState, localPomoCount];
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
    clearInterval(interval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    currentTime(Constants.stdWork, document.querySelector('#countdownText'));
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
    document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
  }
  const todayDistractions = Number(window.localStorage.getItem(Constants.TODAY_DISTRACTION));
  const todayStorage = window.localStorage.getItem(Constants.TODAY_DATE_ID);
  updateDistractions(todayDistractions, todayStorage);

  return [pomoState, Constants.BEGIN_BTN_TXT];
}

/**
   * Updates distractions in local storage
   * @param {Number} todayDistractions The number of distractions today
   * @param {String} todayStorage Today's date currently in window.localStorage
   * @return The updated number of distractions
   */
export function updateDistractions (todayDistractions, todayStorage) {
  // Total distractions
  const distractions = Number(window.localStorage.getItem(Constants.TOTAL_DISTRACTION));
  window.localStorage.setItem(Constants.TOTAL_DISTRACTION, String(distractions + 1));

  // Today's distractions
  const today = formatDate(new Date());
  if (today === todayStorage) {
    todayDistractions++;
  } else {
    // Update
    todayDistractions = 1;
    window.localStorage.setItem(Constants.TODAY_DATE_ID, today);
  }
  window.localStorage.setItem(Constants.TODAY_DISTRACTION, String(todayDistractions));

  return todayDistractions;
}

/**
   * Displays the amount of time remaining
   * @param {*} timer The time to be displayed
   * @param {*} textDisplay The component on which the remaining time is displayed
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
   * @param {*} timer The amont of time on the timer
   * @param {*} pomoState The current state of the pomodoro
   */
export function timeFraction (timer, pomoState) {
  if (pomoState === Constants.timerOptions.POMO) {
    return timer / Constants.stdWork;
  } else if (pomoState === Constants.timerOptions.LONG) {
    return timer / Constants.stdExtBreak;
  } else {
    return timer / Constants.stdBreak;
  }
}
