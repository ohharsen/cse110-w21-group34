import * as Constants from './constants.js';
import * as Storage from './util/storage.js';
import * as Settings from './settings.js';
import { displayGraph } from './util/graph.js';

/* Elements */
export const timerBlock = document.getElementsByClassName('center-container')[0];
export const breakBlock = document.getElementsByClassName('break-message')[0];
export const counterBlock = document.getElementsByClassName('counters-container')[0];
export const statsPane = document.getElementById('stats-container');
export const statsOpenButton = document.getElementById('stats-open-button');
export const statsCloseButton = document.getElementById('stats-close-button');

const totalPomoElem = document.getElementById('total-pomodoros');
const totalInterruptElem = document.getElementById('total-interruptions');
const bestPomoElem = document.getElementById('total-best-pomo');
const bestTimeElem = document.getElementById('total-best-time');
const totalTasksElem = document.getElementById('total-tasks');

const todayPomoElem = document.getElementById('today-pomodoros');
const todayTasksElem = document.getElementById('today-tasks');
const todayInterruptElem = document.getElementById('today-interruptions');

const MINUTES = 60;
const NUM_DECIMALS = 2;

export let statsPaneIsOpen = false;

statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Updates today and total stats when pomo cycle is complete,
 * task is complete, or interruption occurs
 */
export function updateStats () {
  Storage.updateStorage();
  displayTodayStats();
  displayTotalStats();
  displayGraph(Storage.getWeekHistory());
}

/* istanbul ignore next */
/**
 * Opens the statistics pane
 */
export function openStatsPane () {
  updateStats();

  Settings.removeAll();
  if (Settings.settingsPane.classList.contains(Constants.SLIDE_OPEN_SETTINGS)) {
    Settings.closeSettingsPane();

    timerBlock.classList.add(Constants.SLIDE_ACROSS_LEFT);
    breakBlock.classList.add(Constants.SLIDE_ACROSS_LEFT);
  } else {
    timerBlock.classList.add(Constants.SLIDE_OPEN);
    breakBlock.classList.add(Constants.SLIDE_OPEN);
  }
  statsPane.classList.add(Constants.SLIDE_OPEN);
  statsPaneIsOpen = true;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Closes the statistics pane
 */
export function closeStatsPane () {
  timerBlock.classList.remove(Constants.SLIDE_OPEN);
  breakBlock.classList.remove(Constants.SLIDE_OPEN);
  statsPane.classList.remove(Constants.SLIDE_OPEN);

  timerBlock.classList.remove(Constants.SLIDE_ACROSS_LEFT);
  breakBlock.classList.remove(Constants.SLIDE_ACROSS_LEFT);

  timerBlock.classList.add(Constants.SLIDE_CLOSE);
  breakBlock.classList.add(Constants.SLIDE_CLOSE);
  statsPane.classList.add(Constants.SLIDE_CLOSE);

  statsPaneIsOpen = false;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Toggles the respective stats pane buttons based on the current state
 */
export function toggleButtons () {
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
export function displayTotalStats () {
  const totalPomoCount = Storage.getCounter(Storage.TOTAL_POMO_ID);
  const totalInterruptCount = Storage.getCounter(Storage.TOTAL_INTERRUPTION);
  const bestPomoCount = Storage.getCounter(Storage.BEST_DAILY_POMO_ID);
  const totalTaskCount = Storage.getCounter(Storage.TOTAL_TASK_ID);

  totalPomoElem.textContent = totalPomoCount;
  totalInterruptElem.textContent = (totalInterruptCount / (totalPomoCount || 1)).toFixed(NUM_DECIMALS);
  bestPomoElem.textContent = bestPomoCount;
  bestTimeElem.textContent = (bestPomoCount * (Constants.WORK_LENGTH / MINUTES)).toFixed(NUM_DECIMALS);
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
export function displayTodayStats () {
  // extracting daily stats data to be used for calculation
  const todayPomoCount = Storage.getCounter(Storage.TODAY_POMO_ID);
  const todayInterruptCount = Storage.getCounter(Storage.TODAY_INTERRUPTION);
  const todayTaskCount = Storage.getCounter(Storage.TODAY_TASK_ID);

  // calculating daily stats with extracted data and displaying to UI
  todayPomoElem.textContent = todayPomoCount;
  todayInterruptElem.textContent = todayInterruptCount;
  todayTasksElem.textContent = todayTaskCount;
}
