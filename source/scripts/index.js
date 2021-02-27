/* Constants */
const START_STOP_ID = 'start-stop-button';
const RESET_BTN_TXT = '✖ Reset';
const BEGIN_BTN_TXT = '▶ Begin';
const TASK_BTN_ID = 'task';
const TOTAL_TASK_ID = 'total-task-count';
const TODAY_TASK_ID = 'today-task-count';
const WEEK_TASK_ID = 'week-task-count';
const TODAY_DATE_ID = 'today';
const WEEK_START_ID = 'week-start';
const DISTRACTION = 'total-distraction';
const TODAY_DISTRACTION = 'today-distraction';
const LENGTH_OF_WEEK = 7;

// Variables
let onBreak = false;
let pomoCount = 0; // # of pomos covered so far (orig. 0)
const stdWork = 1500; // # of seconds in a work pomo (orig. 1500)
const stdBreak = 300; // # of seconds in a short break (orig. 300)
const stdExtBreak = 900; // # of seconds in a long break (orig. 900)

/**
 * Enumerated timer states
 * @enum {string}
 */
const timerOptions = {
  STOPPED: 'stopped',
  POMO: 'pomo',
  SHORT: 'short break',
  LONG: 'long break'
};

/** *********  Task Button ***********/
const taskButton = document.getElementById(TASK_BTN_ID);
const localStorage = window.localStorage;

if (taskButton) {
  const today = new Date();
  taskButton.addEventListener('click', taskComplete(false, today)); // upon click
}

/**
 * Reformat Date() variable to mm:dd:yyyy
 * @param Date() variable
 * @returns formatted string
 */
function formatDate (toFormat) {
  const dd = String(toFormat.getDate()).padStart(2, '0'); // date
  const mm = String(toFormat.getMonth() + 1).padStart(2, '0'); // month
  const yyyy = toFormat.getFullYear(); // year
  const formatted = mm + '/' + dd + '/' + yyyy;
  return formatted;
}

/**
 * Task is completed upon button click
 * @param clearStorage for debugging
 * @param today current date
 * @returns local storage for debug
 */
function taskComplete (clearStorage, today) {
  if (clearStorage) localStorage.clear();

  const todayStorage = localStorage.getItem(TODAY_DATE_ID);
  let weekCounter = Number(localStorage.getItem(WEEK_TASK_ID));
  let dayCounter = Number(localStorage.getItem(TODAY_TASK_ID));

  if (formatDate(today) !== todayStorage) {
    if (isSameWeek(today)) { // different day, same week
      weekCounter++;
    } else { // different week
      weekCounter = 1;
    }
    dayCounter = 1;
    localStorage.setItem(TODAY_DATE_ID, formatDate(today));
  } else { // same day, same week
    dayCounter++;
    weekCounter++;
  }

  return updateLocalStorage(dayCounter, weekCounter);
}

/**
 * Check if today is in the same week as week start
 * @param today current date
 * @returns boolean is it the same week
 */
function isSameWeek (today) {
  const checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekStorage = localStorage.getItem(WEEK_START_ID);
  let mondayDate;
  let difference = 0;

  // iterate until previous week start is reached
  while (formatDate(checkDate) !== weekStorage) {
    checkDate.setDate(checkDate.getDate() - 1); // previous day
    if (checkDate.getDay() === 1) mondayDate = formatDate(checkDate);

    // not the same week
    if (++difference === LENGTH_OF_WEEK) {
      localStorage.setItem(WEEK_START_ID, mondayDate);
      return false;
    }
  }
  return true;
}

/**
 * Update local storage with finished task information
 * @param dayCounter today total task count
 * @param weekCounter week total task count
 * @returns local storage for debug
 */
function updateLocalStorage (dayCounter, weekCounter) {
  localStorage.setItem(TODAY_TASK_ID, String(dayCounter));
  localStorage.setItem(WEEK_TASK_ID, String(weekCounter));

  const totalTasks = Number(localStorage.getItem(TOTAL_TASK_ID)) + 1;
  localStorage.setItem(TOTAL_TASK_ID, String(totalTasks));

  return localStorage;
}

// Sets the color of the timer
document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');

/** *********  Start/Reset button ***********/
const startStopButton = document.getElementById(START_STOP_ID);
let pomoState = timerOptions.STOPPED;

if (startStopButton) {
  startStopButton.classList.toggle('break-button');
  startStopButton.addEventListener('click', function () {
    if (pomoState === timerOptions.STOPPED) {
      startTimer();
    } else {
      resetTimer();
    }
  });
}

/**
 * A demo function for frontend testing
 */
function testDom () {
  const titleEl = document.querySelector('title');
  titleEl.innerText = 'Test Text';
}

/* istanbul ignore next */
/**
 * Begins the countdown for a break cycle
 * @param {*} duration The duration of the countdown
 * @param {*} textDisplay The component on which the remaining time is outputted
 */
function beginBreak (duration, textDisplay) {
  let timer = duration; // minutes, seconds;
  const interval = setInterval(function () {
    currentTime(timer, textDisplay);
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);

    // Press break in middle of countdown.
    if (pomoState === timerOptions.STOPPED) {
      clearInterval(interval);
      pomoCount = 0;
      onBreak = false;
      currentTime(stdWork, textDisplay);
      document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
      // Changes the color of the timer
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
    }

    if (--timer < -1) {
      clearInterval(interval);
      startStopButton.innerHTML = BEGIN_BTN_TXT;
      pomoState = timerOptions.STOPPED;
      onBreak = false;
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

  const interval = setInterval(function () {
    currentTime(timer, textDisplay);
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);

    // Press break in middle of countdown.
    if (pomoState === timerOptions.STOPPED) {
      clearInterval(interval);
      pomoCount = 0;
      onBreak = false;
      currentTime(stdWork, textDisplay);
      document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
    }

    if (--timer < -1) {
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#34DBB3');
      clearInterval(interval);
      onBreak = true;
      startStopButton.innerHTML = BEGIN_BTN_TXT;
      pomoState = timerOptions.STOPPED;
      if (pomoCount === 3) {
        currentTime(stdExtBreak, textDisplay);
      } else {
        currentTime(stdBreak, textDisplay);
      }
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
  if (startStopButton) {
    startStopButton.innerHTML = RESET_BTN_TXT;

    // Copied from buttonTest
    const display = document.querySelector('#countdownText');
    if (!localOnBreak) {
      pomoState = timerOptions.POMO;
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
    //
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

/** ************  Statistics Frontend ***************/
const timerBlock = document.getElementsByClassName('center-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');

const timerSlideAnim = {
  keys: [
    { transform: 'translate(0, 0)' },
    { transform: 'translate(-15vw, 0)' }
  ],
  timing: {
    duration: 500,
    easing: 'ease-out',
    fill: 'both'
  }
};

const statsSlideAnim = {
  keys: [
    { right: '0' }
  ],
  timing: {
    duration: 500,
    easing: 'ease-out',
    fill: 'forwards'
  }
};

const statsSlide = statsPane.animate(statsSlideAnim.keys, statsSlideAnim.timing);
statsSlide.cancel();
statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function openStatsPane () {
  timerBlock.animate(timerSlideAnim.keys, timerSlideAnim.timing);
  statsSlide.playbackRate = 1;
  statsSlide.play();
}

/* istanbul ignore next */
/**
 * Closes the statistics pane.
 */
function closeStatsPane () {
  timerBlock.animate(timerSlideAnim.keys, timerSlideAnim.timing).reverse();
  statsSlide.playbackRate = -1;
  statsSlide.play();
}

module.exports = {
  togglePomoBreak,
  startTimer,
  resetTimer,
  updateDistractions,
  beginBreak,
  currentTime,
  timerOptions,
  beginCountdown,
  timeFraction,
  formatDate,
  taskComplete,
  isSameWeek,
  updateLocalStorage,
  testDom
};
