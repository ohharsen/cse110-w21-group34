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
const LENGTH_OF_WEEK = 7;
const stdWork = 1500;    //# of seconds in a work pomo (orig. 1500)
const stdBreak = 300;    //# of seconds in a short break (orig. 300)
const stdExtBreak = 900; //# of seconds in a long break (orig. 900)


// Variables
var onBreak = false;
var pomoCount = 0;     //# of pomos covered so far (orig. 0)

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
  taskButton.addEventListener('click', taskComplete); // upon click
}

/* istanbul ignore next */
/**
 * Task is completed upon button click
 */
function taskComplete () {
  const date1 = new Date();
  const date2 = new Date();
  const date3 = new Date();
  updateLocalStorage(false, date1, date2, date3);
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
 * Update local storage with finished task information
 * @param boolean to clear storage or not for debugging
 * @param date1 input date object
 * @param date2 input date object
 * @param date3 input date object
 * @returns localStorage
 */
function updateLocalStorage (clearStorage = false, date1, date2, date3) {
  // date information
  const today = date1;
  let currDate = date2;
  const temp = date3;

  const todayFormat = formatDate(today);
  let weekStartDate;

  // storage variables
  let storageTotalTask;
  let storageTodayTask;
  let storageWeekTask;
  let storageTodayDate;
  let storageWeekStart;

  if (clearStorage) {
    localStorage.clear();
  }

  // check if local storage is empty
  if (localStorage.length === 0) {
    // first "weekStartDate" in storage history
    if (today.getDay() === 1) { // It is Monday
      weekStartDate = todayFormat;
    } else { // get closest previous Monday
      if (currDate.getDay() === 0) { // Sunday
        currDate.setDate(currDate.getDate() - (LENGTH_OF_WEEK - 1));
      } else {
        currDate.setDate(currDate.getDate() - (currDate.getDay() - 1));
      }
      weekStartDate = formatDate(currDate);
    }

    // set local storage variables
    storageTotalTask = '1';
    storageTodayTask = '1';
    storageWeekTask = '1';
    storageTodayDate = todayFormat;
    storageWeekStart = weekStartDate;
  } else {
    storageTotalTask = localStorage.getItem(TOTAL_TASK_ID);
    storageTodayTask = localStorage.getItem(TODAY_TASK_ID);
    storageWeekTask = localStorage.getItem(WEEK_TASK_ID);
    storageTodayDate = localStorage.getItem(TODAY_DATE_ID);
    storageWeekStart = localStorage.getItem(WEEK_START_ID);

    if (todayFormat !== storageTodayDate) { // check if it's the same day
      // get the date difference
      let difference = 0;

      // condition: currDate > storageTodayDate
      // check for new week
      while (formatDate(currDate) !== storageWeekStart) {
        currDate.setDate(currDate.getDate() - 1); // previous day
        if (++difference === LENGTH_OF_WEEK) break;
      }

      if (difference === LENGTH_OF_WEEK) { // CASE 1: different day, different week
        currDate = temp;
        if (currDate.getDay() === 0) { // Sunday
          currDate.setDate(currDate.getDate() - (LENGTH_OF_WEEK - 1));
        } else {
          currDate.setDate(currDate.getDate() - (currDate.getDay() - 1));
        }
        weekStartDate = formatDate(currDate);

        // set local storage variables
        storageTotalTask = String(Number(storageTotalTask) + 1);
        storageTodayTask = '1';
        storageWeekTask = '1';
        storageTodayDate = todayFormat;
        storageWeekStart = weekStartDate;
      } else { // CASE 2: different day, same week
        // set local storage variables
        storageTotalTask = String(Number(storageTotalTask) + 1);
        storageTodayTask = '1';
        storageWeekTask = String(Number(storageWeekTask) + 1);
        storageTodayDate = todayFormat;
      }
    } else { // CASE 3: same day
      // set local storage variables
      storageTotalTask = String(Number(storageTotalTask) + 1);
      storageTodayTask = String(Number(storageTodayTask) + 1);
      storageWeekTask = String(Number(storageWeekTask) + 1);
    }
  }

  // update local storage
  localStorage.setItem(TOTAL_TASK_ID, storageTotalTask);
  localStorage.setItem(TODAY_TASK_ID, storageTodayTask);
  localStorage.setItem(WEEK_TASK_ID, storageWeekTask);
  localStorage.setItem(TODAY_DATE_ID, storageTodayDate);
  localStorage.setItem(WEEK_START_ID, storageWeekStart);

  // console.log(localStorage); // for debugging

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
        document.getElementById("timer-sound").play();
        startStopButton.innerHTML = BEGIN_BTN_TXT; 
        pomoState = timerOptions.STOPPED;
        onBreak = false;
        //Changes the color of the timer
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");
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
      document.getElementById("timer-sound").play();
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
  let timerAudio = document.getElementById("timer-sound");
  if(!timerAudio.paused){
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
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
  }
  return [pomoState, localPomoCount];
}

/**
 * Resets timer upon button click
 */
function resetTimer () {
  pomoState = timerOptions.STOPPED;
  if (startStopButton) {
    startStopButton.innerHTML = BEGIN_BTN_TXT;
  }
  return [pomoState, pomoCount, BEGIN_BTN_TXT];
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
  beginBreak,
  currentTime,
  timerOptions,
  beginCountdown,
  timeFraction,
  formatDate,
  updateLocalStorage,
  testDom
};
