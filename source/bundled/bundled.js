/* Timer Constants */
const START_STOP_ID = 'start-stop-button';
const TASK_BTN_ID = 'task';
const TASK_POMO_COUNTER = 'task-pomo-counter';
const LENGTH_OF_WEEK = 7;
const POMO_CYCLE_LENGTH = 4;
const WORK_LENGTH = 1500; // # of seconds in a work pomo (orig. 1500)
const SHORT_BREAK = 300; // # of seconds in a short break (orig. 300)
const LONG_BREAK = 900; // # of seconds in a long break (orig. 900)

/* Settings Pane Class Lists */
// kind of weird that these are only used in settings.js but is defined here.
// many js files have their own list of consts, should think of grouping them all here or come up with consistent rule to distribute them
const SLIDE_OPEN = 'slide-open';
const SLIDE_CLOSE = 'slide-close';
const SLIDE_ACROSS_RIGHT = 'slide-across-right';
const SLIDE_ACROSS_LEFT = 'slide-across-left';
const SLIDE_OPEN_SETTINGS = 'slide-open-settings';
const SLIDE_CLOSE_SETTINGS = 'slide-close-settings';

/* Text */
const RESET_BTN_TXT = 'Reset';
const END_BTN_TXT = 'End Session';
const BEGIN_BTN_TXT = 'Begin';

/**
 * Enumerated keydown event possible keys
 * @enum {string}
 */
const keys = {
  ESCAPE: 'Escape',
  SPACE: 'Space',
  ENTER: 'Enter',
  T: 'KeyT',
  Y: 'KeyY',
  N: 'KeyN',
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown'
};

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

const BEST_DAILY_POMO_ID = 'best-daily-pomo-count';
const TOTAL_POMO_ID = 'total-pomo-count';
const TOTAL_TASK_ID = 'total-task-count';
const TODAY_TASK_ID = 'today-task-count';
const WEEK_HISTORY = 'week-history';
const TODAY_DATE_ID = 'today';
const WEEK_START_ID = 'week-start';
const TODAY_POMO_ID = 'today-pomo-count';
const TOTAL_INTERRUPTION = 'total-interruption';
const TODAY_INTERRUPTION = 'today-interruption';
const ZEROS = [0, 0, 0, 0, 0, 0, 0];

/**
 * Setter method for counters
 * @param {String} counterID - The key for a counter item in storage
 * @param {Number} counter - The new value for the key
 */
function setCounter (counterID, counter) {
  window.localStorage.setItem(counterID, String(counter));
}

/**
 * Setter method for dates
 * @param {String} dateID - The key for a date item in storage
 * @param {Date} date - The new value for the key
 */
function setDate (dateID, date) {
  window.localStorage.setItem(dateID, date.toString());
}

/**
 * Setter method for the week history
 * @param {Number[]} weekHistory - Pomos completed on each day of the week
 */
function setWeekHistory (weekHistory) {
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
 * Getter method for counters
 * @param {String} counterID - The key for a counter item in storage
 * @returns {Number} the value for the key in storage
 */
function getCounter (counterID) {
  return Number(window.localStorage.getItem(counterID));
}

/**
 * Getter method for dates
 * @param {String} dateID - The key for a date item in storage
 * @returns {Date} the value for the key in storage
 */
function getDate (dateID) {
  return new Date(window.localStorage.getItem(dateID) || new Date(0));
}

/**
 * Getter method for the week history
 * @returns {Number[]} Pomos completed on each day of the week
 */
function getWeekHistory () {
  return JSON.parse(window.localStorage.getItem(WEEK_HISTORY)) || ZEROS;
}

/**
 * Updates local storage with finished task information
 */
function incrTasks () {
  updateStorage();
  setCounter(TODAY_TASK_ID, getCounter(TODAY_TASK_ID) + 1); // incrementing todays tasks by one
  setCounter(TOTAL_TASK_ID, getCounter(TOTAL_TASK_ID) + 1); // incrementing total tasks by one
}

/**
 * Increments completed Pomodoros for today, the current week, and total in
 * local storage
 */
function incrPomoCount () {
  updateStorage();

  const todayPomos = getCounter(TODAY_POMO_ID) + 1;
  setCounter(TODAY_POMO_ID, todayPomos); // increment todays pomo count
  setCounter(TOTAL_POMO_ID, getCounter(TOTAL_POMO_ID) + 1); // increment total pomo count

  if (getCounter(BEST_DAILY_POMO_ID) < todayPomos) setCounter(BEST_DAILY_POMO_ID, todayPomos);

  // Update week history
  const today = new Date();
  const dayIdx = ((today.getDay() - 1) + LENGTH_OF_WEEK) % LENGTH_OF_WEEK;
  const weekHistory = getWeekHistory();
  weekHistory[dayIdx]++;
  setWeekHistory(weekHistory);
}

/**
 * Increments interruptions for today and in total
 */
function incrInterruptions () {
  updateStorage();
  setCounter(TODAY_INTERRUPTION, getCounter(TODAY_INTERRUPTION) + 1); // increments todays interruptions
  setCounter(TOTAL_INTERRUPTION, getCounter(TOTAL_INTERRUPTION) + 1); // increments total interruptions
}

/**
 * Updates storage today counters and dates if today's date has changed
 */
function updateStorage () {
  if (!isStorageDateToday()) {
    // Set counters
    setCounter(TODAY_POMO_ID, 0);
    setCounter(TODAY_TASK_ID, 0);
    setCounter(TODAY_INTERRUPTION, 0);

    // Set dates (and week history if necessary)
    const today = new Date();
    setDate(TODAY_DATE_ID, today);
    const recentMonday = getRecentMonday(today);
    if (!isSameDay(getDate(WEEK_START_ID), recentMonday)) {
      setDate(WEEK_START_ID, recentMonday);
      setWeekHistory(ZEROS);
    }
  }
}

/**
 * Checks if the storage date for today matches today's real date
 * @returns {Boolean} true if they are the same, false otherwise
 */
function isStorageDateToday () {
  return isSameDay(new Date(), getDate(TODAY_DATE_ID));
}

/**
 * Checks if two date values are the same MM/DD/YYYY
 * @param {Date} date1 - The first date to compare
 * @param {Date} date2 - The second date to compare
 * @returns {Boolean} true if they are the same, false otherwise
 */
function isSameDay (date1, date2) {
  const isSameDate = date1.getDate() === date2.getDate();
  const isSameMonth = date1.getMonth() === date2.getMonth();
  const isSameYear = date1.getFullYear() === date2.getFullYear();
  return isSameDate && isSameMonth && isSameYear;
}

/**
 * Gets most recent Monday from a given date
 * @param {Date} date - Any date
 * @returns {Date} the most recent Monday from given date
 */
function getRecentMonday (date) {
  const checkDate = new Date(date);

  // iterate until previous week start is reached
  while (checkDate.getDay() !== 1) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  return checkDate;
}

/* Button IDs */
const RESET_YES_ID = 'reset-yes-button'; // might be good to move all these to Constants.js
const RESET_NO_ID = 'reset-no-button';

const ACCESSIBLE_CLASS = 'accessible';
const root = document.documentElement;

let accessibleMode = false;
let keystrokeMode = true;
let autostartMode = false;

document.onkeydown = keyControls;

/* All istanbul ignored code is tested in Cypress or uses Canvas */

/**
 * Toggles the accessibility colors and fonts
 *  Darkens backgrounds for better readibility of text
 *  Colors picked according to AAA Guidilines
 */
function toggleAccessibility () {
  if (!accessibleMode) {
    root.classList.add(ACCESSIBLE_CLASS);
  } else {
    root.classList.remove(ACCESSIBLE_CLASS);
  }
  accessibleMode = !accessibleMode;
}

/**
 * Getter method for accessibleMode
 * @returns {Boolean} true when accessibility mode is on, false if off
 */
function isA11yEnabled () {
  return accessibleMode;
}

/* istanbul ignore next */
/**
 * Listens to specific key presses and fires an event
 * @param {Event} e - The fired event object
 */
function keyControls (e) {
  switch (e.code) {
    case keys.ESCAPE:
      e.preventDefault();
      (settingsPaneIsOpen) ? closeSettingsPane() : ((statsPaneIsOpen) ? closeStatsPane() : (() => {})());
      break;
    case keys.LEFT_ARROW:
      e.preventDefault();
      removeAll();
      (settingsPaneIsOpen) ? closeSettingsPane() : openStatsPane();
      break;
    case keys.RIGHT_ARROW:
      e.preventDefault();
      removeAll();
      (statsPaneIsOpen) ? closeStatsPane() : openSettingsPane();
      break;
    case keys.SPACE:
      if (!(document.activeElement instanceof HTMLInputElement)) {
        e.preventDefault();
        startResetController();
      }
      break;
    case keys.Y:
      document.getElementById(RESET_YES_ID).click();
      break;
    case keys.N:
      document.getElementById(RESET_NO_ID).click();
      break;
    case keys.T:
    case keys.DOWN_ARROW:
      e.preventDefault();
      document.getElementById(TASK_BTN_ID).click();
      break;
  }
}

/**
 * Toggles keystroke access whenever the user toggles the setting switch
 */
function toggleKeystroke () {
  keystrokeMode = !keystrokeMode;
  document.onkeydown = (keystrokeMode) ? keyControls : undefined;
}

/**
 * Toggles the autostart for the timer whenever the user toggles the setting switch
 */
function toggleAutoStart () {
  autostartMode = !autostartMode;
}

/**
 * Getter method for auto start mode
 * @returns {Boolean} true when auto start mode is on, false if off
 */
function isAutoStartEnabled () {
  return autostartMode;
}

/* Settings Pane and Buttons */
// might be good to move all these to Constants.js
const settingsPane = document.getElementById('settings-container');
const settingsOpenButton = document.getElementById('settings-open-button');
const settingsCloseButton = document.getElementById('settings-close-button');
const settingsColorButton = document.getElementById('colors-switch');
const settingsKeysButton = document.getElementById('keystroke-switch');
const settingsAutoStartButton = document.getElementById('autostart-switch');

const backgroundOneOption = document.getElementById('background_1');
const backgroundTwoOption = document.getElementById('background_2');
const backgroundThreeOption = document.getElementById('background_3');

const backgroundOneURL = "url('./images/background.svg')";
const backgroundTwoURL = "url('./images/background2.png')";
const backgroundThreeURL = "url('./images/background3.png')";

const backgroundDropDown = document.getElementById('backgroundDropDown');

backgroundOneOption.onclick = backgroundOneClicked;
backgroundTwoOption.onclick = backgroundTwoClicked;
backgroundThreeOption.onclick = backgroundThreeClicked;

backgroundDropDown.onmouseover = enableDropdown;

settingsOpenButton.onclick = openSettingsPane;
settingsCloseButton.onclick = closeSettingsPane;
settingsColorButton.onclick = toggleAccessibility;
settingsKeysButton.onclick = toggleKeystroke;
settingsAutoStartButton.onclick = toggleAutoStart;

let settingsPaneIsOpen = false;

/* istanbul ignore next */
/**
 * Opens the settings pane and closes the stats pane
 */
function openSettingsPane () {
  removeAll();
  // closing the status pane and open the settings
  if (statsPane.classList.contains(SLIDE_OPEN)) {
    closeStatsPane();
    timerBlock.classList.remove(SLIDE_CLOSE);
    timerBlock.classList.add(SLIDE_ACROSS_RIGHT);
    breakBlock.classList.remove(SLIDE_CLOSE);
    breakBlock.classList.add(SLIDE_ACROSS_RIGHT);
  } else { // add the slide open settings (css)
    timerBlock.classList.add(SLIDE_OPEN_SETTINGS);
    breakBlock.classList.add(SLIDE_OPEN_SETTINGS);
  }
  settingsPane.classList.add(SLIDE_OPEN_SETTINGS);

  settingsPaneIsOpen = true;
  toggleButtons$1();
}

/* istanbul ignore next */
/**
 * Closes the settings pane and allows stats pane to reopen
 * removes unnecessary css animations
 */
function closeSettingsPane () {
  timerBlock.classList.remove(SLIDE_OPEN_SETTINGS);
  breakBlock.classList.remove(SLIDE_OPEN_SETTINGS);
  settingsPane.classList.remove(SLIDE_OPEN_SETTINGS);

  timerBlock.classList.remove(SLIDE_ACROSS_RIGHT);
  breakBlock.classList.remove(SLIDE_ACROSS_RIGHT);

  timerBlock.classList.add(SLIDE_CLOSE_SETTINGS);
  breakBlock.classList.add(SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.add(SLIDE_CLOSE_SETTINGS);

  settingsPaneIsOpen = false;
  toggleButtons$1();
}

/* instanbul ignore next */
/**
 * Toggles the respective settings pane buttons based on the current state
 */
function toggleButtons$1 () {
  settingsOpenButton.disabled = settingsPaneIsOpen;
  settingsCloseButton.disabled = !settingsPaneIsOpen;
  settingsColorButton.disabled = !settingsPaneIsOpen;
  settingsKeysButton.disabled = !settingsPaneIsOpen;
  settingsAutoStartButton.disabled = !settingsPaneIsOpen;
}

/* istanbul ignore next */
/**
 * Removes existing animation classes from stats and settings panes
 */
function removeAll () {
  timerBlock.classList.remove(SLIDE_CLOSE);
  breakBlock.classList.remove(SLIDE_CLOSE);
  statsPane.classList.remove(SLIDE_CLOSE);

  timerBlock.classList.remove(SLIDE_CLOSE_SETTINGS);
  breakBlock.classList.remove(SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.remove(SLIDE_CLOSE_SETTINGS);
}

/*
* initial load
* sets height of settings/stats tab
*/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

/* istanbul ignore next */
/**
 * on window resize trigger new height
 */
window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function disableDropdown () {
  document.getElementById('backgrounds').style.display = 'none';
}

function enableDropdown () {
  document.getElementById('backgrounds').style.display = '';
}

function backgroundOneClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundOneURL;
}

function backgroundTwoClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundTwoURL;
}

function backgroundThreeClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundThreeURL;
}

/* global zingchart */

/* Graph Constants */
const X_LABELS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const X_LABEL = 'Days';
const Y_LABEL = 'Pomos Completed';
const TEXT_FONT = 'Roboto';
const TEXT_FONT_SIZE = '12px';
const TEXT_FONT_SIZE_ACCESSIBILITY = '15px';
const TEXT_FONT_WEIGHT = 'normal';
const TEXT_FONT_WEIGHT_ACCESSIBILITY = 'bold';
const BAR_COLOR = '#eb4000';
const BAR_COLOR_ACCESSIBILITY = '#B50014';
const ANIMATION_SPEED = 275;
const Y_MIN_SCALING = 3;
const Y_MAX_STEP = 6;
const ONE = 1;
const TEST_PROCESS = 'test';

// /* All instanbul ignored code is tested in Cypress or uses Canvas */

// /**
//  * Function to find max value in weekly data
//  * @param {Number[]} data - An array of weekly data of pomos completed
//  * @return max - the max value in the weekly data
//  */
function findMax (data) {
  let max = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
}

// /* istanbul ignore next */
// /**
//  * Displays a graph showing the weekly statistics of pomos completed
//  * @param {Number[]} data - An array of weekly data of pomos completed
//  */
function displayGraph (data = ZEROS) {
  if ((typeof process === 'object' && process.env.NODE_ENV === TEST_PROCESS)) return;

  // set font and bar color appropriately when accessibility is on
  const barColor = (isA11yEnabled()) ? BAR_COLOR_ACCESSIBILITY : BAR_COLOR;
  const fontSize = (isA11yEnabled()) ? TEXT_FONT_SIZE_ACCESSIBILITY : TEXT_FONT_SIZE;
  const fontWeight = (isA11yEnabled()) ? TEXT_FONT_WEIGHT_ACCESSIBILITY : TEXT_FONT_WEIGHT;
  let maxVal = findMax(data);
  let step = null;

  // when values are small, scales the graph appropriately
  if (maxVal < Y_MIN_SCALING) {
    maxVal = Y_MIN_SCALING;
  }
  if (maxVal < Y_MAX_STEP) {
    step = ONE;
  }

  const myConfig = {
    type: 'bar',
    // tooltip is the number when users scrolls over bars
    tooltip: {
      'font-family': TEXT_FONT,
      'font-size': fontSize,
      'font-weight': fontWeight
    },
    scaleX: {
      label: {
        text: X_LABEL,
        'font-family': TEXT_FONT,
        'font-size': fontSize,
        'font-weight': fontWeight
      },
      labels: X_LABELS
    },
    scaleY: {
      label: {
        text: Y_LABEL,
        'font-family': TEXT_FONT,
        'font-size': fontSize,
        'font-weight': fontWeight
      },
      step: step,
      'max-value': maxVal // for scaling y-axis
    },
    plotarea: {
      margin: 'dynamic' // for the graph to fit the div
    },
    plot: {
      // for the bar animations
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: ANIMATION_SPEED
      }
    },
    series: [
      {
        values: data, // the data to populate graph
        'background-color': barColor, // Bar fill color
        alpha: ONE // for a solid bar color
      }
    ]
  };
  zingchart.render({
    id: 'graph',
    data: myConfig,
    height: '100%',
    width: '100%'
  });
}

/* Elements */
const timerBlock = document.getElementsByClassName('center-container')[0];
const breakBlock = document.getElementsByClassName('break-message')[0];
document.getElementsByClassName('counters-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');

const totalPomoElem = document.getElementById('total-pomodoros');
const totalInterruptElem = document.getElementById('total-interruptions');
const bestPomoElem = document.getElementById('total-best-pomo');
const bestTimeElem = document.getElementById('total-best-time');
const totalTasksElem = document.getElementById('total-tasks');

const todayPomoElem = document.getElementById('today-pomodoros');
const todayTasksElem = document.getElementById('today-tasks');
const todayInterruptElem = document.getElementById('today-interruptions');

const MINUTES$1 = 60;
const NUM_DECIMALS = 2;

let statsPaneIsOpen = false;

statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Updates today and total stats when pomo cycle is complete,
 * task is complete, or interruption occurs
 */
function updateStats () {
  updateStorage();
  displayTodayStats();
  displayTotalStats();
  displayGraph(getWeekHistory());
}

/* istanbul ignore next */
/**
 * Opens the statistics pane
 */
function openStatsPane () {
  updateStats();

  removeAll();
  if (settingsPane.classList.contains(SLIDE_OPEN_SETTINGS)) {
    closeSettingsPane();

    timerBlock.classList.add(SLIDE_ACROSS_LEFT);
    breakBlock.classList.add(SLIDE_ACROSS_LEFT);
  } else {
    timerBlock.classList.add(SLIDE_OPEN);
    breakBlock.classList.add(SLIDE_OPEN);
  }
  statsPane.classList.add(SLIDE_OPEN);
  statsPaneIsOpen = true;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Closes the statistics pane
 */
function closeStatsPane () {
  timerBlock.classList.remove(SLIDE_OPEN);
  breakBlock.classList.remove(SLIDE_OPEN);
  statsPane.classList.remove(SLIDE_OPEN);

  timerBlock.classList.remove(SLIDE_ACROSS_LEFT);
  breakBlock.classList.remove(SLIDE_ACROSS_LEFT);

  timerBlock.classList.add(SLIDE_CLOSE);
  breakBlock.classList.add(SLIDE_CLOSE);
  statsPane.classList.add(SLIDE_CLOSE);

  statsPaneIsOpen = false;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Toggles the respective stats pane buttons based on the current state
 */
function toggleButtons () {
  statsOpenButton.disabled = statsPaneIsOpen;
  statsCloseButton.disabled = !statsPaneIsOpen;
}

/* istanbul ignore next */
/**
 * @summary Displays the user's current all-time statistics on the pane
 * Total statistics include:
 *    - Total pomodoros completed
 *    - Total avg. interruptions per pomodoro
 *    - Total tasks completed
 *    - Most pomodoros completed in a single day
 */
function displayTotalStats () {
  const totalPomoCount = getCounter(TOTAL_POMO_ID);
  const totalInterruptCount = getCounter(TOTAL_INTERRUPTION);
  const bestPomoCount = getCounter(BEST_DAILY_POMO_ID);
  const totalTaskCount = getCounter(TOTAL_TASK_ID);

  totalPomoElem.textContent = totalPomoCount;
  totalInterruptElem.textContent = (totalInterruptCount / (totalPomoCount || 1)).toFixed(NUM_DECIMALS);
  bestPomoElem.textContent = bestPomoCount;
  bestTimeElem.textContent = (bestPomoCount * (WORK_LENGTH / MINUTES$1)).toFixed(NUM_DECIMALS);
  totalTasksElem.textContent = totalTaskCount;
}

/* istanbul ignore next */
/**
 * @summary Displays the user's statistics for the day on the pane
 * Today statistics include:
 *    - Today's pomodoros completed
 *    - Today's avg. interruptions per pomodoro
 *    - Today's tasks completed
 *    - Most pomodoros completed in a single day
 */
function displayTodayStats () {
  // extracting daily stats data to be used for calculation
  const todayPomoCount = getCounter(TODAY_POMO_ID);
  const todayInterruptCount = getCounter(TODAY_INTERRUPTION);
  const todayTaskCount = getCounter(TODAY_TASK_ID);

  // calculating daily stats with extracted data and displaying to UI
  todayPomoElem.textContent = todayPomoCount;
  todayInterruptElem.textContent = todayInterruptCount;
  todayTasksElem.textContent = todayTaskCount;
}

const taskButton = document.getElementById(TASK_BTN_ID);

let taskPomoCount = 0;

/* Event listener */
if (taskButton) {
  toggleTaskButtonDisabled(true);
  taskButton.addEventListener('click', function (event) {
    completeTask();
    event.preventDefault();
    document.getElementById('animation-overlay').style.display = 'flex';
    setTimeout(function () {
      document.getElementById('animation-overlay').style.display = 'none';
    }, 3000);
  }); // upon click
}

/**
 * Increases the number of pomodoros completed for the current task
 */
function increaseTaskPomo () {
  taskPomoCount++;
  document.getElementById(TASK_POMO_COUNTER).innerHTML = taskPomoCount;
}

/**
 * Toggles task button
 * @param {Boolean} disabled - Allows caller to select whether button is disabled
 */
function toggleTaskButtonDisabled (disabled) {
  if (taskPomoCount === 0) disabled = true;
  taskButton.disabled = disabled;
}

/**
 * Resets pomo count for the task, updates storage / stats, and disables button
 */
function completeTask () {
  taskPomoCount = 0;
  document.getElementById(TASK_POMO_COUNTER).innerHTML = taskPomoCount;

  incrTasks();
  toggleTaskButtonDisabled(true);
  updateStats();
}

/* Constants */
const STOP_TIMER_COLOR = 'var(--grey)';
const WORK_TIMER_COLOR = 'var(--red)';
const BREAK_TIMER_COLOR = 'var(--green)';
const COLORED_POT_SOURCE = 'images/honey-pot-color.svg';
const GRAY_POT_SOURCE = 'images/honey-pot-gray.svg';
const DASH_STROKE_VAL = 220;
const MINUTES = 60;
const BASE_10 = 10;
const FINAL_POMO = 4;

const startStopButton = document.getElementById(START_STOP_ID);
const timerRing = document.getElementById('base-timer-path-remaining');
const countdownText = document.getElementById('countdownText');
const yesButton = document.getElementById('reset-yes-button');
const noButton = document.getElementById('reset-no-button');
const timerAudio = document.getElementById('timer-sound');
const settingsButton = document.getElementById('settings-open-button');
const statsButton = document.getElementById('stats-open-button');

const workIndicator = document.getElementById('work-indicator');
const longBreakIndicator = document.getElementById('long-break-indicator');
const shortBreakIndicator = document.getElementById('short-break-indicator');

const breakMessage = document.getElementById('break-message');
const breakContainer = document.getElementById('break-container');
const breakMessages = ['Stand up!', 'Relax your mind', 'Rest!', 'Breathe', 'Take a break!']; // array we cycle through to display new break messages

const timeWorker = (window.Worker && !window.Cypress) ? new Worker('./scripts/timeWorker.js') : null;

/* Class List */
const HOVER_TEXT = 'hover-text';
const BREAK_BUTTON = 'break-button';
const HIGHLIGHT = 'highlight';

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = timerOptions.STOPPED;
let onBreak = false;
let legacyInterval;
let breakInterval; // so we can display a new message every 10 seconds
let firstReset = true; // Is reset being clicked for the first time
let firstEndSession = true; // Is end session being clicked for the first time
hideBreakMessage(); // hideBreakMessage at very beginning

/* Event listeners */
if (startStopButton) {
  startStopButton.classList.toggle(BREAK_BUTTON);
  startStopButton.addEventListener('click', startResetController);
}
// Toggles countdown text on click
if (countdownText) {
  countdownText.addEventListener('click', () => {
    if (pomoState !== timerOptions.STOPPED) {
      if (countdownText.classList.contains(HOVER_TEXT)) {
        countdownText.classList.remove(HOVER_TEXT);
      } else {
        countdownText.classList.add(HOVER_TEXT);
      }
    }
  });
}

yesButton.addEventListener('click', () => {
  resetConfirm(true);
});
noButton.addEventListener('click', () => {
  resetConfirm(false);
});

/**
 * Callback for events that trigger the start or stop of timer
 */
function startResetController () {
  if (pomoState === timerOptions.STOPPED) {
    startTimer();
  } else {
    resetPrompt();
  }
}

/* istanbul ignore next */
/**
 * Begins the timer countdown for a cycle
 * @param {Number} duration - The duration of the countdown
 */
function beginCountdown (duration) {
  duration--;
  displayTime(duration);
  const timerRingColor = (onBreak) ? BREAK_TIMER_COLOR : WORK_TIMER_COLOR;
  settingsButton.disabled = !(onBreak);
  statsButton.disabled = !(onBreak);
  settingsButton.style.opacity = (onBreak) ? 1 : 0.2;
  statsButton.style.opacity = (onBreak) ? 1 : 0.2;
  timerRing.setAttribute('stroke', timerRingColor);
  timerRing.setAttribute('stroke-dasharray', `${(timeFraction(duration, pomoState) * DASH_STROKE_VAL)} ${DASH_STROKE_VAL}`);

  if (timeWorker) {
    timeWorker.onmessage = (e) => {
      if (pomoState === timerOptions.STOPPED) return;

      const { timeLeft } = e.data;
      displayTime(timeLeft);
      timerRing.setAttribute('stroke-dasharray', `${(timeFraction(timeLeft, pomoState) * DASH_STROKE_VAL)} ${DASH_STROKE_VAL}`);
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
 * browsers that do not support web-workers
 * @param {Number} duration - The duration of the countdown
 */
function setCountdownInterval (duration) {
  let timer = duration;
  legacyInterval = setInterval(() => {
    --timer;
    displayTime(timer);
    timerRing.setAttribute('stroke-dasharray', `${(timeFraction(timer, pomoState) * DASH_STROKE_VAL)} ${DASH_STROKE_VAL}`);
    if (timer < 0) {
      clearInterval(legacyInterval);
      stopTimer();
    }
  }, 1000);
}

/**
   * Toggles break styling in start-stop-button
   * @param {Boolean} onBreak - Boolean to check if the timer is on break
   * @returns {Boolean} Negation of onBreak
   */
function togglePomoBreak (onBreak) {
  if (startStopButton) {
    startStopButton.classList.toggle(BREAK_BUTTON);
  }
  return !onBreak;
}

/**
 * Starts timer upon button click
 * @param {Boolean} localOnBreak - Boolean to check if the timer is on break
 * @param {Number} localPomoCount - Number storing which pomo the timer is ons
 * @returns {Array} An array containing the pomoState and the pomoCount
 */
function startTimer (localOnBreak = onBreak, localPomoCount = pomoCount) {
  if (!onBreak) {
    toggleTaskButtonDisabled(true);
    hideBreakMessage();
  }

  if (onBreak && !isAutoStartEnabled()) {
    showBreakMessage();
  }

  if (!timerAudio.paused) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
  if (startStopButton) {
    // displaying the appropriate text in the start stop button
    if (!isAutoStartEnabled()) {
      startStopButton.innerHTML = RESET_BTN_TXT;
    } else if (isAutoStartEnabled() && onBreak) {
      startStopButton.innerHTML = END_BTN_TXT;
    } else if (isAutoStartEnabled() && !onBreak) {
      startStopButton.innerHTML = RESET_BTN_TXT;
    }
    if (!localOnBreak) {
      pomoState = timerOptions.POMO;
      beginCountdown(WORK_LENGTH);
    } else {
      if (localPomoCount === FINAL_POMO) {
        localPomoCount = 0;
        pomoCount = 0;
        pomoState = timerOptions.LONG;
        beginCountdown(LONG_BREAK);
      } else {
        localPomoCount++;
        pomoState = timerOptions.SHORT;
        beginCountdown(SHORT_BREAK);
      }
    }
  }
  return [pomoState, localPomoCount];
}

/**
 * Stops the timer and refreshes user interface
 */
function stopTimer () {
  pomoState = timerOptions.STOPPED;
  timerAudio.play();
  // Mutes timer color
  timerRing.setAttribute('stroke', STOP_TIMER_COLOR);
  countdownText.classList.remove(HOVER_TEXT);

  // displaying the appropriate text in the start stop button
  if (isAutoStartEnabled() && !onBreak) {
    startStopButton.innerHTML = END_BTN_TXT;
  } else if (!isAutoStartEnabled()) {
    startStopButton.innerHTML = BEGIN_BTN_TXT;
  } else if (isAutoStartEnabled && onBreak) {
    startStopButton.innerHTML = RESET_BTN_TXT;
  }

  if (!onBreak) {
    pomoCount++;
    // Dispalys the next cycle without beginning it
    if (pomoCount === POMO_CYCLE_LENGTH) {
      displayTime(LONG_BREAK);
      timerTypeIndicator(timerOptions.LONG);
    } else {
      displayTime(SHORT_BREAK);
      timerTypeIndicator(timerOptions.SHORT);
    }

    // incrementing daily pomo cycle count
    incrPomoCount();
    increaseTaskPomo();
    updateStats();

    // automatically starts next timer if autostart is enabled
    if (isAutoStartEnabled()) {
      showBreakMessage();
      setTimeout(startResetController, 1000);
    }
  } else {
    // Displays the next cycle without beggining it
    displayTime(WORK_LENGTH);
    timerTypeIndicator(timerOptions.POMO);
    if (isAutoStartEnabled()) {
      setTimeout(startResetController, 1000);
    }
  }
  updatePots();
  toggleTaskButtonDisabled(false);
  onBreak = togglePomoBreak(onBreak);

  // hides the break message if you are not on break
  if (!onBreak) {
    hideBreakMessage();
  }
}

/**
 * Updates pot icons to show number of pomos completed for the cycle
 */
function updatePots () {
  for (let i = 1; i < pomoCount + 1; i++) {
    document.getElementById('pot' + i).src = COLORED_POT_SOURCE;
  }

  for (let i = pomoCount + 1; i <= POMO_CYCLE_LENGTH; i++) {
    document.getElementById('pot' + i).src = GRAY_POT_SOURCE;
  }
}

/**
   * Resets timer upon button click
   * @returns {Array} An array containing the stopped timer state and begin button text
   */
function resetTimer () {
  pomoState = timerOptions.STOPPED;
  toggleTaskButtonDisabled(true);

  // only increments interruptions if not ending the session
  if (!isAutoStartEnabled() || !onBreak) {
    incrInterruptions();
    updateStats();
  }

  if (startStopButton) {
    startStopButton.innerHTML = BEGIN_BTN_TXT;
    if (timeWorker) timeWorker.postMessage({ start: false });
    if (legacyInterval) clearInterval(legacyInterval);
    if (onBreak) onBreak = togglePomoBreak(onBreak);
    countdownText.classList.remove(HOVER_TEXT);
    timerRing.setAttribute('stroke', STOP_TIMER_COLOR);
    timerRing.setAttribute('stroke-dasharray', `${DASH_STROKE_VAL} ${DASH_STROKE_VAL}`);
    displayTime(WORK_LENGTH);
    timerTypeIndicator(WORK_LENGTH);
  }
  if (!onBreak) {
    hideBreakMessage();
  }
  return [pomoState, BEGIN_BTN_TXT];
}

/*
 * Checks if the reset button has been pressed before and resets automatically if so
 * Also checks if end session button has been clicked before and resets automatically if so
 */
function resetPrompt () {
  if (!firstEndSession && isAutoStartEnabled() && onBreak) {
    resetTimer();
    return;
  }
  if (!firstReset && (!isAutoStartEnabled() || !onBreak)) {
    resetTimer();
    return;
  }

  startStopButton.style.display = 'none';
  if (isAutoStartEnabled() && onBreak) {
    document.getElementById('prompt-text').innerHTML = 'End this pomo session? <br> This will not count as an interruption.';
  } else {
    document.getElementById('prompt-text').innerHTML = 'This will count as an interruption.<br> Are you sure?';
  }
  document.getElementById('prompt').style.display = 'flex';
  yesButton.disabled = false;
  noButton.disabled = false;
}

/**
 * Hides reset prompt whenever prompt is answered or timer ends
 */
function hidePrompt () {
  startStopButton.style.display = '';
  document.getElementById('prompt').style.display = 'none';
  yesButton.disabled = true;
  noButton.disabled = true;
}

/**
 * Resets the timer if confirmation is received
 * @param {Boolean} isConfirm - True to reset timer, False otherwise
 */
function resetConfirm (isConfirm) {
  hidePrompt();
  if (isConfirm && isAutoStartEnabled() && onBreak) {
    firstEndSession = false;
  }
  if (isConfirm && (!isAutoStartEnabled() || !onBreak)) {
    firstReset = false;
  }
  if (isConfirm) {
    resetTimer();
  }
}

/**
 * Displays the amount of time remaining
 * @param {Number} time - The time to be displayed
 * @returns {String} text displayed in the countdown
 */
function displayTime (time) {
  let minutes, seconds;
  minutes = parseInt(time / MINUTES, BASE_10);
  seconds = parseInt(time % MINUTES, BASE_10);
  minutes = minutes < BASE_10 ? '0' + minutes : minutes;
  seconds = seconds < BASE_10 ? '0' + seconds : seconds;
  countdownText.textContent = minutes + ':' + seconds;

  if (onBreak) {
    window.document.title = 'Break: ' + countdownText.textContent;
  } else {
    window.document.title = 'Work: ' + countdownText.textContent;
  }

  return countdownText.textContent;
}

/**
 * Calculates the fraction of the time remaining for the current countdown
 * @param {Number} timer The amont of time on the timer
 * @param {String} pomoState The current state of the pomodoro
 * @returns {Number} amount of time remaining
 */
function timeFraction (timer, pomoState) {
  if (pomoState === timerOptions.POMO) {
    return timer / WORK_LENGTH;
  } else if (pomoState === timerOptions.LONG) {
    return timer / LONG_BREAK;
  } else {
    return timer / SHORT_BREAK;
  }
}

/* istanbul ignore next */
/**
 * Displays the textual indicator of the current timer type
 * @param {String} type - Timer enum type indicating work, long break, or short break
 */
function timerTypeIndicator (type) {
  workIndicator.classList.remove(HIGHLIGHT);
  longBreakIndicator.classList.remove(HIGHLIGHT);
  shortBreakIndicator.classList.remove(HIGHLIGHT);
  if (type === timerOptions.LONG) {
    longBreakIndicator.classList.add(HIGHLIGHT);
  } else if (type === timerOptions.SHORT) {
    shortBreakIndicator.classList.add(HIGHLIGHT);
  } else {
    workIndicator.classList.add(HIGHLIGHT);
  }
}

/**
 * Displays the break message when you are on a break
 * Switches break message every 10 seconds
 */
function showBreakMessage () {
  breakMessage.style.visibility = 'visible';
  breakContainer.style.display = 'inline-block';

  let i = 0;
  breakInterval = setInterval(e => {
    i = (i + breakMessages.length) % breakMessages.length;
    breakMessage.innerText = breakMessages[i];
    i++;
  }, 10000);
}

/**
 * Hides the break message when you are no longer on a break
 */
function hideBreakMessage () {
  breakMessage.style.visibility = 'hidden';
  breakContainer.style.display = 'none';
  clearInterval(breakInterval);
}

export { beginCountdown, displayTime, hidePrompt, resetConfirm, resetPrompt, resetTimer, setCountdownInterval, startResetController, startTimer, timeFraction, timerTypeIndicator, togglePomoBreak, updatePots };
