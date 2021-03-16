import * as Constants from './constants.js';
import * as Storage from './util/storage.js';
import * as Settings from './settings.js';
import { drawGraph } from './util/graph.js';

export const timerBlock = document.getElementsByClassName('center-container')[0];
export const counterBlock = document.getElementsByClassName('counters-container')[0];
export const statsPane = document.getElementById('stats-container');
export const statsOpenButton = document.getElementById('stats-open-button');
export const statsCloseButton = document.getElementById('stats-close-button');
const graphCanvas = document.getElementById('weekly-graph');

export let isOpenStatsPane = false;

statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Updates today and total stats when pomo cycle is complete,
 * task is complete, or interruption occurs
 */
export function updateStats () {
  displayTodayStats();
  displayTotalStats();
  drawGraph(graphCanvas, Storage.getWeeklyHistory());
}

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
export function openStatsPane () {
  updateStats();

  Settings.removeAll();
  if (Settings.settingsPane.classList.contains('slide-open-settings')) {
    Settings.closeSettingsPane();

    timerBlock.classList.add('slide-across-left');
  } else {
    timerBlock.classList.add('slide-open');
  }
  statsPane.classList.add('slide-open');
  isOpenStatsPane = true;
  toggleButtons();
}

/* istanbul ignore next */

/**
 * Closes the statistics pane.
 */
export function closeStatsPane () {
  timerBlock.classList.remove('slide-open');
  statsPane.classList.remove('slide-open');

  timerBlock.classList.remove('slide-across-left');

  timerBlock.classList.add('slide-close');
  statsPane.classList.add('slide-close');

  isOpenStatsPane = false;
  toggleButtons();
}

/**
 * Enables / Disables the respective stats pane buttons based on the current
 * state.
 */
export function toggleButtons () {
  statsOpenButton.disabled = isOpenStatsPane;
  statsCloseButton.disabled = !isOpenStatsPane;
}

/* istanbul ignore next */
/**
 * Displays the user's current all-time statistics on the statistics pane.
 * Total statistics include:
 *    - Total pomodoros completed
 *    - Total avg. interruptionss per pomodoro
 *    - Total tasks completed
 *    - Most pomodoros completed in a single day
 */
export function displayTotalStats () {
  const totalPomoElem = document.getElementById('total-pomodoros');
  const totalInterruptElem = document.getElementById('total-interruptions');
  const bestPomoElem = document.getElementById('total-best-pomo');
  const bestTimeElem = document.getElementById('total-best-time');
  const totalTasksElem = document.getElementById('total-tasks');

  const totalPomoCount = Storage.getTotalPomoCount();
  const totalInterruptCount = Storage.getTotalDistractions();
  const bestPomoCount = Storage.getBestDailyPomoCount();
  const totalTaskCount = Storage.getTotalTasksCount();

  totalPomoElem.textContent = totalPomoCount;
  totalInterruptElem.textContent = (totalInterruptCount / (totalPomoCount || 1)).toFixed(2);
  bestPomoElem.textContent = bestPomoCount;
  bestTimeElem.textContent = (bestPomoCount * (Constants.WORK_LENGTH / 60)).toFixed(2);
  totalTasksElem.textContent = totalTaskCount;
}

/* istanbul ignore next */
/**
 * Displays the user's statistics for the day on the statistics pane.
 * Today statistics include:
 *    - Today's pomodoros completed
 *    - Today's avg. interruptions per pomodoro
 *    - Today's tasks completed
 *    - Most pomodoros completed in a single day
 */
export function displayTodayStats () {
  // setting variables for html elements to modify
  const todayPomoElem = document.getElementById('today-pomodoros');
  const todayTasksElem = document.getElementById('today-tasks');
  const todayInterruptElem = document.getElementById('today-interruptions');

  // extracting daily stats data to be used for calculation
  const todayPomoCount = Storage.getPomoCount();
  const todayInterruptCount = Storage.getDistractions();
  const todayTaskCount = Storage.getTasksCount();

  // calculating daily stats with extracted data and displaying to UI
  todayPomoElem.textContent = todayPomoCount;
  todayInterruptElem.textContent = todayInterruptCount;
  todayTasksElem.textContent = todayTaskCount;
}
