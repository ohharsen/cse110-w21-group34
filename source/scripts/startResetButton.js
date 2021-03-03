const { formatDate } = require('./taskButton');
const startStopButton = document.getElementById(START_STOP_ID);
let pomoState = timerOptions.STOPPED;
let interval;


/**
 * The callback for events that trigger the start or stop of timer
 */
function startResetController(){
    if (pomoState === timerOptions.STOPPED) {
      startTimer();
    } else {
      resetTimer();
    }
}

if (startStopButton) {
  startStopButton.classList.toggle('break-button');
  startStopButton.addEventListener('click', startResetController);
}

/* istanbul ignore next */
/**
   * Begins the countdown for a break cycle
   * @param {*} duration The duration of the countdown
   * @param {*} textDisplay The component on which the remaining time is outputted
   */
function beginBreak (duration, textDisplay) {
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
      startStopButton.innerHTML = BEGIN_BTN_TXT;
      pomoState = timerOptions.STOPPED;
      onBreak = togglePomoBreak(onBreak);
      // Changes the color of the timer
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
      currentTime(stdWork, textDisplay);
    }
  }, 1000);
}

/* istanbul ignore next */
/**
   * Begins the countdown for a work cycle
   * @param {*} duration The duration of the countdown
   * @param {*} textDisplay The component on which the remaining time is outputted
   */
function beginCountdown (duration, textDisplay) {
  let timer = duration; // minutes, seconds;
  currentTime(--timer, textDisplay);
  document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
  interval = setInterval(function () {
    --timer;
    currentTime(timer, textDisplay);
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);
    if (timer < 0) {
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#34DBB3');
      clearInterval(interval);
      document.getElementById('timer-sound').play();
      onBreak = togglePomoBreak(onBreak);
      startStopButton.innerHTML = BEGIN_BTN_TXT;
      pomoState = timerOptions.STOPPED;
      if (pomoCount === 3) {
        currentTime(stdExtBreak, textDisplay);
      } else {
        currentTime(stdBreak, textDisplay);
      }
      taskPomoCount++;
      document.getElementById('task-pomo-counter').innerHTML = taskPomoCount;
    }
  }, 1000);
}

/**
   * Toggles break styling in start-stop-button
   */
function togglePomoBreak (onBreak) {
  if (startStopButton) {
    startStopButton.classList.toggle('break-button');
  }
  return !onBreak;
}

/**
   * Starts timer upon button click
   */
function startTimer (localOnBreak = onBreak, localPomoCount = pomoCount) {
  const timerAudio = document.getElementById('timer-sound');
  if (!timerAudio.paused) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
  if (startStopButton) {
    startStopButton.innerHTML = RESET_BTN_TXT;

    const display = document.querySelector('#countdownText');
    if (!localOnBreak) {
      pomoState = timerOptions.POMO;
      document.getElementById('cycle-pomo-counter').innerHTML = pomoCount + 1;
      beginCountdown(stdWork, display);
    } else {
      if (localPomoCount === 3) {
        pomoCount = 0;
        localPomoCount = 0;
        pomoState = timerOptions.LONG;
        beginBreak(stdExtBreak, display);
      } else {
        pomoCount++;
        localPomoCount++;
        pomoState = timerOptions.SHORT;
        beginBreak(stdBreak, display);
      }
    }
  }
  return [pomoState, localPomoCount];
}

/**
   * Resets timer upon button click
   * @return An array containing the stopped timer state and begin button text
   */
function resetTimer () {
  pomoState = timerOptions.STOPPED;
  if (startStopButton) {
    startStopButton.innerHTML = BEGIN_BTN_TXT;
    clearInterval(interval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    currentTime(stdWork, document.querySelector('#countdownText'));
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
    document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
  }
  const todayDistractions = Number(localStorage.getItem(TODAY_DISTRACTION));
  const todayStorage = localStorage.getItem(TODAY_DATE_ID);
  updateDistractions(todayDistractions, todayStorage);
  return [pomoState, BEGIN_BTN_TXT];
}

/**
   * Updates distractions in local storage
   * @param {Number} todayDistractions The number of distractions today
   * @param {String} todayStorage Today's date currently in localStorage
   * @return The updated number of distractions
   */
function updateDistractions (todayDistractions, todayStorage) {
  // Total distractions
  let distractions = Number(localStorage.getItem(DISTRACTION));
  distractions++;
  localStorage.setItem(DISTRACTION, String(distractions));

  // Today's distractions
  const today = formatDate(new Date());
  if (today === todayStorage) {
    todayDistractions++;
  } else {
    // Update
    todayDistractions = 1;
    localStorage.setItem(TODAY_DATE_ID, today);
  }
  localStorage.setItem(TODAY_DISTRACTION, String(todayDistractions));

  return todayDistractions;
}

/**
   * Displays the amount of time remaining
   * @param {*} timer The time to be displayed
   * @param {*} textDisplay The component on which the remaining time is displayed
   */
function currentTime (timer, textDisplay) {
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
function timeFraction (timer, pomoState) {
  if (pomoState === timerOptions.POMO) {
    return timer / stdWork;
  } else if (pomoState === timerOptions.LONG) {
    return timer / stdExtBreak;
  } else {
    return timer / stdBreak;
  }
}

module.exports = {
  beginBreak,
  beginCountdown,
  togglePomoBreak,
  startTimer,
  resetTimer,
  updateDistractions,
  currentTime,
  timeFraction,
  startResetController
};
