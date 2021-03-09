import * as Constants from './constants.js';

const timerBlock = document.getElementsByClassName('center-container')[0];
const counterBlock = document.getElementsByClassName('counters-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');
statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;
const settingsPane = document.getElementById('settings-container');
const settingsOpenButton = document.getElementById('settings-open-button');
const settingsCloseButton = document.getElementById('settings-close-button');
settingsOpenButton.onclick = openSettingsPane;
settingsCloseButton.onclick = closeSettingsPane;

/* istanbul ignore next */
/**
 * Updates today and total stats when pomo cycle is complete,
 * task is complete, or distraction occurs
 */
export function updateStats () {
  displayTodayStats();
  displayTotalStats();
}

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function openStatsPane () {
  if(timerBlock.classList.contains('slide-open-settings')) {
    closeSettingsPane();
  }

  displayTotalStats();
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
export function closeStatsPane () {
  timerBlock.classList.remove('slide-open');
  counterBlock.classList.remove('slide-open');
  statsPane.classList.remove('slide-open');

  timerBlock.classList.add('slide-close');
  counterBlock.classList.add('slide-close');
  statsPane.classList.add('slide-close');
}

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function openSettingsPane () {
  if(timerBlock.classList.contains('slide-open')) {
    closeStatsPane();
  }

  timerBlock.classList.remove('slide-close-settings');
  counterBlock.classList.remove('slide-close-settings');
  settingsPane.classList.remove('slide-close-settings');

  timerBlock.classList.add('slide-open-settings');
  counterBlock.classList.add('slide-open-settings');
  settingsPane.classList.add('slide-open-settings');
}

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function closeSettingsPane () {
  timerBlock.classList.remove('slide-open-settings');
  counterBlock.classList.remove('slide-open-settings');
  settingsPane.classList.remove('slide-open-settings');

  timerBlock.classList.add('slide-close-settings');
  counterBlock.classList.add('slide-close-settings');
  settingsPane.classList.add('slide-close-settings');
}

/**
 * Displays the user's current all-time statistics on the statistics pane.
 * Total statistics include:
 *    - Total pomodoros completed
 *    - Total avg. distractions per pomodoro
 *    - Total tasks completed
 *    - Most pomodoros completed in a single day
 */
export function displayTotalStats () {
  const totalPomoElem = document.getElementById('total-pomodoros');
  const totalDistractElem = document.getElementById('total-distractions');
  const bestPomoElem = document.getElementById('total-best-pomo');
  const bestTimeElem = document.getElementById('total-best-time');
  const totalTasksElem = document.getElementById('total-tasks');

  const totalPomoCount = window.localStorage.getItem(Constants.TOTAL_POMO_ID) || '0';
  const totalDistractCount = window.localStorage.getItem(Constants.TOTAL_DISTRACTION) || '0';
  const bestPomoCount = window.localStorage.getItem(Constants.BEST_DAILY_POMO_ID) || '0';
  const totalTaskCount = window.localStorage.getItem(Constants.TOTAL_TASK_ID) || '0';

  totalPomoElem.textContent = totalPomoCount;
  totalDistractElem.textContent = (Number(totalDistractCount) / (Number(totalPomoCount) || 1)).toFixed(2);
  bestPomoElem.textContent = bestPomoCount;
  bestTimeElem.textContent = (Number(bestPomoCount) * (Constants.WORK_LENGTH / 60)).toFixed(2);
  totalTasksElem.textContent = totalTaskCount;
}

/**
 * Displays the user's statistics for the day on the statistics pane.
 * Today statistics include:
 *    - Today's pomodoros completed
 *    - Today's avg. distractions per pomodoro
 *    - Today's tasks completed
 *    - Most pomodoros completed in a single day
 */
export function displayTodayStats () {
  // setting variables for html elements to modify
  const todayPomoElem = document.getElementById('today-pomodoros');
  const todayTasksElem = document.getElementById('today-tasks');
  const todayDistractElem = document.getElementById('today-distractions');

  // extracting daily stats data to be used for calculation
  const todayPomoCount = window.localStorage.getItem(Constants.TODAY_POMO_ID) || '0';
  const todayDistractCount = window.localStorage.getItem(Constants.TODAY_DISTRACTION) || '0';
  const todayTaskCount = window.localStorage.getItem(Constants.TODAY_TASK_ID) || '0';

  // calculating daily stats with extracted data and displaying to UI
  todayPomoElem.textContent = todayPomoCount;
  todayDistractElem.textContent = todayDistractCount;
  todayTasksElem.textContent = todayTaskCount;
}
