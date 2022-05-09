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
const SLIDE_OPEN = 'slide-open';
const SLIDE_CLOSE = 'slide-close';
const SLIDE_ACROSS_RIGHT = 'slide-across-right';
const SLIDE_ACROSS_LEFT = 'slide-across-left';
const SLIDE_OPEN_SETTINGS = 'slide-open-settings';
const SLIDE_CLOSE_SETTINGS = 'slide-close-settings';

/* Text */
const RESET_BTN_TXT = 'Reset';
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
  setCounter(TODAY_TASK_ID, getCounter(TODAY_TASK_ID) + 1);
  setCounter(TOTAL_TASK_ID, getCounter(TOTAL_TASK_ID) + 1);
}

/**
 * Increments completed Pomodoros for today, the current week, and total in
 * local storage
 */
function incrPomoCount () {
  updateStorage();

  const todayPomos = getCounter(TODAY_POMO_ID) + 1;
  setCounter(TODAY_POMO_ID, todayPomos);
  setCounter(TOTAL_POMO_ID, getCounter(TOTAL_POMO_ID) + 1);

  if (getCounter(BEST_DAILY_POMO_ID) < todayPomos) setCounter(BEST_DAILY_POMO_ID, todayPomos);

  // Update week history
  const today = new Date();
  const dayIdx = (today.getDay() - 1) % LENGTH_OF_WEEK;
  const weekHistory = getWeekHistory();
  weekHistory[dayIdx]++;
  setWeekHistory(weekHistory);
}

/**
 * Increments interruptions for today and in total
 */
function incrInterruptions () {
  updateStorage();
  setCounter(TODAY_INTERRUPTION, getCounter(TODAY_INTERRUPTION) + 1);
  setCounter(TOTAL_INTERRUPTION, getCounter(TOTAL_INTERRUPTION) + 1);
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
const RESET_YES_ID = 'reset-yes-button';
const RESET_NO_ID = 'reset-no-button';

const ACCESSIBLE_CLASS = 'accessible';
const root = document.documentElement;

let accessibleMode = false;
let keystrokeMode = true;

document.onkeydown = keyControls;

/* All instanbul ignored code is tested in Cypress or uses Canvas */

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

/* Settings Pane and Buttons */
const settingsPane = document.getElementById('settings-container');
const settingsOpenButton = document.getElementById('settings-open-button');
const settingsCloseButton = document.getElementById('settings-close-button');
const settingsColorButton = document.getElementById('colors-switch');
const settingsKeysButton = document.getElementById('keystroke-switch');

settingsOpenButton.onclick = openSettingsPane;
settingsCloseButton.onclick = closeSettingsPane;
settingsColorButton.onclick = toggleAccessibility;
settingsKeysButton.onclick = toggleKeystroke;

let settingsPaneIsOpen = false;

/* istanbul ignore next */
/**
 * Opens the settings pane and closes the stats pane
 */
function openSettingsPane () {
  removeAll();

  if (statsPane.classList.contains(SLIDE_OPEN)) {
    closeStatsPane();

    timerBlock.classList.remove(SLIDE_CLOSE);
    timerBlock.classList.add(SLIDE_ACROSS_RIGHT);
  } else {
    timerBlock.classList.add(SLIDE_OPEN_SETTINGS);
  }
  settingsPane.classList.add(SLIDE_OPEN_SETTINGS);

  settingsPaneIsOpen = true;
  toggleButtons$1();
}

/* istanbul ignore next */
/**
 * Closes the settings pane and allows stats pane to reopen
 */
function closeSettingsPane () {
  timerBlock.classList.remove(SLIDE_OPEN_SETTINGS);
  settingsPane.classList.remove(SLIDE_OPEN_SETTINGS);

  timerBlock.classList.remove(SLIDE_ACROSS_RIGHT);

  timerBlock.classList.add(SLIDE_CLOSE_SETTINGS);
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
}

/* istanbul ignore next */
/**
 * Removes existing animation classes from stats and settings panes
 */
function removeAll () {
  timerBlock.classList.remove(SLIDE_CLOSE);
  statsPane.classList.remove(SLIDE_CLOSE);

  timerBlock.classList.remove(SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.remove(SLIDE_CLOSE_SETTINGS);
}

/* Graph Constants */
const X_LABELS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const Y_LABEL = 'Pomos Completed';
const INITIAL_Y_AXES = [0, 1, 2, 3];
const TEXT_ALIGN_CENTER = 'center';
const TEXT_FONT = '12px Roboto';
const TEXT_FONT_ACCESSIBILITY = 'bold 15px Roboto';
const BAR_COLOR = '#eb4000';
const BAR_COLOR_ACCESSIBILITY = '#B50014';
const BAR_WIDTH = 20;
const BAR_PADDING = 12;
const BAR_LEFT_MARGIN = 24;
const TEXT_HEIGHT = 14;
const TOP_PADDING = 16;
const RIGHT_PADDING = 16;
const BOTTOM_PADDING = 32;
const LEFT_PADDING = 48;

/* Drawing Constants */
const FILL_TEXT_X_PAD = 16;
const FILL_TEXT_Y_PAD = 4;
const X_LABEL_HEIGHT_PAD = 8;
const Y_MIN_SPACING = 3;
const Y_MAX_SPACING = 11;
const TWO = 2;

/* Other Constants */
const TEST_PROCESS = 'test';
const CONTEXT_2D = '2d';

/* All instanbul ignored code is tested in Cypress or uses Canvas */

/* istanbul ignore next */
/**
 * Draws a graph to the given canvas element with the given data points
 * @param {HTMLCanvasElement} canvas - Target canvas
 * @param {Number[]} data - An array
 */
function drawGraph (canvas, data = ZEROS) {
  if (!canvas || (typeof process === 'object' && process.env.NODE_ENV === TEST_PROCESS)) return;

  const ctx = canvas.getContext(CONTEXT_2D);
  const axes = calculateAxes(data);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxes(ctx, canvas.height, canvas.width, axes);
  drawBars(ctx, canvas.height, data, axes);
  ctx.save();
}

/* istanbul ignore next */
/**
 * Draws axes for the graph
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} canvasHeight - The canvas height
 * @param {Number} canvasWidth - The canvas width
 * @param {Number[]} axes - y-axis values
 */
function drawAxes (ctx, canvasHeight, canvasWidth, axes) {
  const maxHeight = canvasHeight - BOTTOM_PADDING;
  const maxWidth = canvasWidth - RIGHT_PADDING;

  // Draw y-axes
  // If accessibibility mode is on we use larger font
  ctx.font = (isA11yEnabled()) ? TEXT_FONT_ACCESSIBILITY : TEXT_FONT;
  ctx.textAlign = TEXT_ALIGN_CENTER;
  for (const [i, axis] of axes.entries()) {
    const x = LEFT_PADDING;
    const y = TOP_PADDING + maxHeight - Math.round(maxHeight * (i / (axes.length - 1)));
    drawLine(ctx, x, y, maxWidth, y);
    ctx.fillText(axis, x - FILL_TEXT_X_PAD, y + FILL_TEXT_Y_PAD);
  }

  // Draw y-label
  ctx.save();
  ctx.translate(16, Math.round((TOP_PADDING + maxHeight) / TWO));
  ctx.rotate(-Math.PI / TWO);
  ctx.fillText(Y_LABEL, 0, 0);
  ctx.restore();

  // Draw x-labels
  for (const [i, label] of X_LABELS.entries()) {
    const x = LEFT_PADDING + BAR_LEFT_MARGIN + i * (BAR_WIDTH + BAR_PADDING);
    const y = TOP_PADDING + maxHeight + X_LABEL_HEIGHT_PAD + (TEXT_HEIGHT / TWO);
    ctx.fillText(label, x, y);
  }
  drawLine(ctx, LEFT_PADDING, 0, LEFT_PADDING, TOP_PADDING + maxHeight);
}

/**
 * Calculates and returns 4 y-axes used in the graph. The first axis will always
 * be 0
 *
 * If max data is:
 *      0  - 3  => dont change max
 *      4  - 10 => round max up 1
 *      11 - 30 => round max up 2
 * spacing = max axis / 4
 * @summary Calculates y-axis marks
 * @param {Number[]} data - The weekly data to scale the axes by
 * @returns {Number[]} - The axes in array form, from first axis to last axis
 */
function calculateAxes (data) {
  // distribute the spacing and use slice to copy array
  const axes = INITIAL_Y_AXES.slice();

  // Calculating current max pomo cycles within week
  let max = Math.max(...data);

  // Checking max value to determine new max with forced minimum spacing
  // between max value and highest y axis
  if (max < Y_MIN_SPACING) return axes;
  if (max >= Y_MAX_SPACING) max++;

  max++;

  // making sure max is divisible by 3 to not have decimals in y axis splits
  while (max % Y_MIN_SPACING !== 0) {
    max++;
  }

  // Setting axes values and rounding to one decimal place
  let axisIndex = 1;
  axes[axisIndex++] = max / Y_MIN_SPACING;
  axes[axisIndex++] = TWO * max / Y_MIN_SPACING;
  axes[axisIndex] = max;

  return axes;
}

/* istanbul ignore next */
/**
 * Draws bars for each datapoint in data, relative to the highest valued
 * axis given in axes
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} canvasHeight - The canvas height
 * @param {Number[]} data - x-data
 * @param {Number[]} axes - y-axis values
 */
function drawBars (ctx, canvasHeight, data, axes) {
  const maxAxis = Math.max(...axes);
  const maxHeight = canvasHeight - BOTTOM_PADDING;
  for (const [i, d] of data.entries()) {
    const barHeight = Math.round(maxHeight * (d / maxAxis));
    if (barHeight > 0) {
      // If accessibibility mode is on we use darker shade of red for rectangle
      const barColor = (isA11yEnabled()) ? BAR_COLOR_ACCESSIBILITY : BAR_COLOR;
      const x = LEFT_PADDING + BAR_LEFT_MARGIN + i * (BAR_WIDTH + BAR_PADDING);
      const y = TOP_PADDING + maxHeight - barHeight;
      drawBar(ctx, x, y, BAR_WIDTH, barHeight, barColor);
    }
  }
}

/* istanbul ignore next */
/**
 * Draws a bar centered at (x, y) with w width (horizontal) and h height
 * (vertical), using the given canvas' context
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} x - Horizontal position of upper-left corner
 * @param {Number} y - Vertical position of upper-left corner
 * @param {Number} w - Width
 * @param {Number} h - Height
 * @param {string} color - Hex color (e.g. #fafefc)
 */
function drawBar (ctx, x, y, w, h, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x - Math.round(w / TWO), y, w, h);
  ctx.restore();
}

/* istanbul ignore next */
/**
 * Draws a line from (x1, y1) to (x2, y2) on the given canvas' context
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} x1 - Horizontal position of start point
 * @param {Number} y1 - Vertical position of start point
 * @param {Number} x2 - Horizontal position of end point
 * @param {Number} y2 - Vertical position of end point
 */
function drawLine (ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/* Elements */
const timerBlock = document.getElementsByClassName('center-container')[0];
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

const graphCanvas = document.getElementById('weekly-graph');

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
  drawGraph(graphCanvas, getWeekHistory());
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
  } else {
    timerBlock.classList.add(SLIDE_OPEN);
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
  statsPane.classList.remove(SLIDE_OPEN);

  timerBlock.classList.remove(SLIDE_ACROSS_LEFT);

  timerBlock.classList.add(SLIDE_CLOSE);
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

const workIndicator = document.getElementById('work-indicator');
const longBreakIndicator = document.getElementById('long-break-indicator');
const shortBreakIndicator = document.getElementById('short-break-indicator');

const timeWorker = (window.Worker && !window.Cypress) ? new Worker('./scripts/timeWorker.js') : null;

/* Class List */
const HOVER_TEXT = 'hover-text';
const BREAK_BUTTON = 'break-button';
const HIGHLIGHT = 'highlight';

let pomoCount = 0; // # of pomos covered so far (orig. 0)
let pomoState = timerOptions.STOPPED;
let onBreak = false;
let legacyInterval;
let firstReset = true; // Is rest being clicked for the first time

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
  toggleTaskButtonDisabled(true);

  if (!timerAudio.paused) {
    timerAudio.pause();
    timerAudio.currentTime = 0;
  }
  if (startStopButton) {
    startStopButton.innerHTML = RESET_BTN_TXT;

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
  startStopButton.innerHTML = BEGIN_BTN_TXT;
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
  } else {
    // Displays the next cycle without beggining it
    displayTime(WORK_LENGTH);
    timerTypeIndicator(timerOptions.POMO);
  }
  updatePots();
  toggleTaskButtonDisabled(false);
  onBreak = togglePomoBreak(onBreak);
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

  incrInterruptions();
  updateStats();
  return [pomoState, BEGIN_BTN_TXT];
}

/*
 * Checks if the reset button has been pressed before and resets automatically if so
 */
function resetPrompt () {
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
  if (isConfirm) {
    resetTimer();
  }
  firstReset = false;
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

export { beginCountdown, displayTime, hidePrompt, resetConfirm, resetPrompt, resetTimer, setCountdownInterval, startResetController, startTimer, timeFraction, timerTypeIndicator, togglePomoBreak, updatePots };
