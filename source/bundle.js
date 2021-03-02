(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
/* Constants */
/* eslint no-unused-vars: "off" */
const START_STOP_ID = 'start-stop-button';
const RESET_BTN_TXT = '✖ Reset';
const BEGIN_BTN_TXT = '▶ Begin';
const TASK_BTN_ID = 'task';
const TOTAL_TASK_ID = 'total-task-count';
const TODAY_TASK_ID = 'today-task-count';
const WEEK_TASK_ID = 'week-task-count';
const TODAY_DATE_ID = 'today';
const WEEK_START_ID = 'week-start';
const TODAY_POMO_ID = 'today-pomo-count';
const DISTRACTION = 'total-distraction';
const TODAY_DISTRACTION = 'today-distraction';
const LENGTH_OF_WEEK = 7;
const stdWork = 1500; // # of seconds in a work pomo (orig. 1500)
const stdBreak = 300; // # of seconds in a short break (orig. 300)
const stdExtBreak = 900; // # of seconds in a long break (orig. 900)


// Variables
const onBreak = false;
const pomoCount = 0; // # of pomos covered so far (orig. 0)
const taskPomoCount = 0; // # of pomos for current task (orig. 0)

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

const taskButton = document.getElementById(TASK_BTN_ID);
const localStorage = window.localStorage;

/* Make global for testing */
global.START_STOP_ID = START_STOP_ID;
global.RESET_BTN_TXT = RESET_BTN_TXT;
global.BEGIN_BTN_TXT = BEGIN_BTN_TXT;
global.TASK_BTN_ID = TASK_BTN_ID;
global.TOTAL_TASK_ID = TOTAL_TASK_ID;
global.TODAY_TASK_ID = TODAY_TASK_ID;
global.WEEK_TASK_ID = WEEK_TASK_ID;
global.TODAY_DATE_ID = TODAY_DATE_ID;
global.WEEK_START_ID = WEEK_START_ID;
global.TODAY_POMO_ID = TODAY_POMO_ID;
global.DISTRACTION = DISTRACTION;
global.TODAY_DISTRACTION = TODAY_DISTRACTION;
global.LENGTH_OF_WEEK = LENGTH_OF_WEEK;
global.stdWork = stdWork;
global.stdBreak = stdBreak;
global.stdExtBreak = stdExtBreak;
global.onBreak = onBreak;
global.pomoCount = pomoCount;
global.taskPomoCount = taskPomoCount;
global.timerOptions = timerOptions;
global.taskButton = taskButton;
global.localStorage = localStorage;


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
const { formatDate } = require('./taskButton');
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
      document.getElementById('cycle-pomo-counter').innerHTML = pomoCount;
      onBreak = togglePomoBreak(onBreak);
      currentTime(stdWork, textDisplay);
      document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
      // Changes the color of the timer
      document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
    }

    if (--timer < -1) {
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

  const interval = setInterval(function () {
    currentTime(timer, textDisplay);
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * 220)} 220`);

    // Press break in middle of countdown.
    if (pomoState === timerOptions.STOPPED) {
      clearInterval(interval);
      pomoCount = 0;
      document.getElementById('cycle-pomo-counter').innerHTML = pomoCount;
      onBreak = false;
      currentTime(stdWork, textDisplay);
      document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', '220 220');
    }

    if (--timer < -1) {
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
      const todayPomos = Number(localStorage.getItem(TODAY_POMO_ID));
      const todayStorage = localStorage.getItem(TODAY_DATE_ID);
      updatePomoCount(todayPomos, todayStorage);
      taskPomoCount++;
      document.getElementById('task-pomo-counter').innerHTML = taskPomoCount;
    }
  }, 1000);
}

function updatePomoCount(todayPomos, todayStorage){
  const today = formatDate(new Date());
  if (today === todayStorage) {
    todayPomos++;
  } else {
    // Update
    todayPomos = 1;
    localStorage.setItem(TODAY_DATE_ID, today);
  }
  localStorage.setItem(TODAY_POMO_ID, String(todayPomos));
  
  return todayPomos;
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

    // Copied from buttonTest
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
  timeFraction
};

},{"./taskButton":4}],3:[function(require,module,exports){
require('./startResetButton');
const timerBlock = document.getElementsByClassName('center-container')[0];
const counterBlock = document.getElementsByClassName('counters-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');

statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function openStatsPane () {
  /* we have
    toal task count
    today task count,
    week task count,
    week start

    need
    total/day/week interuptions
    total pomos
    way to store daily weekly
  */
  displayTodayStats();


  timerBlock.classList.remove('slide-close');
  counterBlock.classList.remove('slide-close');
  statsPane.classList.remove('slide-close');
  timerBlock.classList.add('slide-open');
  counterBlock.classList.add('slide-open');
  statsPane.classList.add('slide-open');
}

/* istanbul ignore next */
/**
 * Closes the statistics pane.
 */
function closeStatsPane () {
  timerBlock.classList.remove('slide-open');
  counterBlock.classList.remove('slide-open');
  statsPane.classList.remove('slide-open');
  timerBlock.classList.add('slide-close');
  counterBlock.classList.add('slide-close');
  statsPane.classList.add('slide-close');
}

/**
 * Displays the user's statistics for the day on the statistics pane.
 * Today statistics include:
 *    - Today's pomodoros completed
 *    - Today's avg. distractions per pomodoro
 *    - Today's tasks completed
 *    - Most pomodoros completed in a single day
 */
function displayTodayStats () {
  const todayPomoElem = document.getElementById('today-pomodoros');
  const todayTasksElem = document.getElementById('today-tasks');
  const todayDistractElem = document.getElementById('today-distractions');
  // extracting stats data to be used for calculation 
  const todayPomoCount = localStorage.getItem('today-pomo-count') || '0';
  const todayDistractCount = localStorage.getItem('today-distraction') || '0';
  const todayTaskCount = localStorage.getItem('today-task-count') || '0';
  // TODO: Add pomodoros completed in a single day


  // calculating stats with extracted data and displaying to UI 
  todayPomoElem.textContent = todayPomoCount;
  todayDistractElem.textContent = todayDistractCount;
  todayTasksElem.textContent = todayTaskCount;
  // TODO: Display pomodoros completed in a single day
}
},{"./startResetButton":2}],4:[function(require,module,exports){

require('./index');
if (taskButton) {
  const today = new Date();
  taskButton.addEventListener('click', function (event) {
    taskComplete(false, today);
    event.preventDefault();
  }); // upon click
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
  taskPomoCount = 0;
  document.getElementById('task-pomo-counter').innerHTML = taskPomoCount;
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

module.exports = {
  formatDate,
  taskComplete,
  isSameWeek,
  updateLocalStorage
};

},{"./index":1}]},{},[3]);
