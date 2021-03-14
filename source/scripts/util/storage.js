import * as Constants from '../constants.js';

export const BEST_DAILY_POMO_ID = 'best-daily-pomo-count';
export const TOTAL_POMO_ID = 'total-pomo-count';
export const TOTAL_TASK_ID = 'total-task-count';
export const TODAY_TASK_ID = 'today-task-count';
export const WEEK_TASK_ID = 'week-task-count';
export const WEEK_HISTORY = 'week-history';
export const TODAY_DATE_ID = 'today';
export const WEEK_START_ID = 'week-start';
export const TODAY_POMO_ID = 'today-pomo-count';
export const TOTAL_CYCLE_ID = 'total-cycle-count';
export const TOTAL_DISTRACTION = 'total-distraction';
export const TODAY_DISTRACTION = 'today-distraction';

/**
 * Update local storage with finished task information
 * @param {number} dayCounter today total task count
 * @param {number} weekCounter week total task count
 * @param {number} dayOfWeek the day of the week (0 --> Monday, 1 --> Tuesday, ... etc)
 * @returns local storage for debug
 */
export function updateTasks (dayCounter, weekCounter, dayOfWeek) {
  window.localStorage.setItem(TODAY_TASK_ID, String(dayCounter));
  window.localStorage.setItem(WEEK_TASK_ID, String(weekCounter));

  const totalTasks = Number(window.localStorage.getItem(TOTAL_TASK_ID)) + 1;
  window.localStorage.setItem(TOTAL_TASK_ID, String(totalTasks));

  const weekHistory = JSON.parse(window.localStorage.getItem(WEEK_HISTORY));
  ++weekHistory[dayOfWeek];
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
  updateStats();
  return window.localStorage;
}

/**
 * Update's pomo count for today in local storage
 * @param {Number} todayPomos The number of daily current pomos completed
 * @param {String} todayStorage the local storage date for the current day
 * @return number of pomos completed today
 */
 export function setPomoCount (todayPomos, todayStorage) {
  // update pomo cycle day count
  const today = new Date(); // formatDate
  // case if we are on same day
  if (today === todayStorage) {
    todayPomos++;
  } else { // case if we are on different day
    todayPomos = 1;
    window.localStorage.setItem(TODAY_DATE_ID, today.toString());
  }
  window.localStorage.setItem(TODAY_POMO_ID, String(todayPomos));
  window.localStorage.setItem(TOTAL_POMO_ID, String(Number(window.localStorage.getItem(TOTAL_POMO_ID)) + 1));
  if (Number(window.localStorage.getItem(BEST_DAILY_POMO_ID)) < todayPomos) {
    window.localStorage.setItem(BEST_DAILY_POMO_ID, todayPomos);
  }

  return todayPomos;
}

/**
 * Updates the pomo count for the current day of the week in local storage.
 */
 export function incrDailyPomoCount () {
  const dayIdx = ((new Date()).getDay() - 1) % Constants.LENGTH_OF_WEEK;
  const weekHistory = JSON.parse(window.localStorage.getItem(WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];

  weekHistory[dayIdx]++;
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
 * Reset week history array to zeros
 */
 export function clearWeeklyHistory () {
  const zeros = [0, 0, 0, 0, 0, 0, 0];
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(zeros));
}

/**
 * Updates total cycles in local storage
 * @returns the updated number of total cycles
 */
export function incrTotalCycles () {
  const totalCycles = Number(window.localStorage.getItem(TOTAL_CYCLE_ID)) + 1;
  window.localStorage.setItem(TOTAL_CYCLE_ID, String(totalCycles));
  return window.localStorage.getItem(TOTAL_CYCLE_ID);
}

/**
 * Updates distractions in local storage
 * @param {Number} todayDistractions The number of distractions today
 * @param {String} todayStorage Today's date currently in window.localStorage
 * @return The updated number of distractions
 */
export function setDistractions (todayDistractions, todayStorage) {
  // Total distractions
  const distractions = Number(window.localStorage.getItem(TOTAL_DISTRACTION));
  window.localStorage.setItem(TOTAL_DISTRACTION, String(distractions + 1));

  // Today's distractions
  const today = new Date(); // formatDate()
  if (today === todayStorage) {
    todayDistractions++;
  } else {
    // Update
    todayDistractions = 1;
    window.localStorage.setItem(TODAY_DATE_ID, today.toString());
  }
  window.localStorage.setItem(TODAY_DISTRACTION, String(todayDistractions));

  return todayDistractions;
}

export function getTodayStorageDate () {
  return new Date(window.localStorage.getItem(Constants.TODAY_DATE_ID));
}

export function setTodayStorageDate (today) {
  window.localStorage.setItem(TODAY_DATE_ID, today.toString());
}

export function getWeekStorageDate () {
  return new Date(window.localStorage.getItem(WEEK_START_ID));
}

export function setWeekStorageDate (mondayDate) {
  window.localStorage.setItem(WEEK_START_ID, mondayDate.toString());
}

export function getWeekCounter () {
  return Number(window.localStorage.getItem(WEEK_TASK_ID));
}

export function getDayCounter () {
  return Number(window.localStorage.getItem(TODAY_TASK_ID));
}