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
 */
export function updateTasks (dayCounter, weekCounter, dayOfWeek) {
  // Update today's task count
  window.localStorage.setItem(Constants.TODAY_TASK_ID, String(dayCounter));
  window.localStorage.setItem(Constants.WEEK_TASK_ID, String(weekCounter));

  // Update total task count
  const totalTasks = Number(window.localStorage.getItem(Constants.TOTAL_TASK_ID)) + 1;
  window.localStorage.setItem(Constants.TOTAL_TASK_ID, String(totalTasks));
}

/**
 * 
 * @returns Total tasks completed
 */
export function getTotalTasksCount () {
  return window.localStorage.getItem(Constants.TOTAL_TASK_ID) || '0';
}

/**
 * Update's pomo count for today in local storage
 * @param {Number} todayPomos The number of daily current pomos completed
 * @return number of pomos completed today
 */
export function setPomoCount (todayPomos) {
  // update pomo cycle day count
  const storageDate = new Date(window.localStorage.getItem(TODAY_DATE_ID));
  const today = new Date();
  if (isSameDay(today, storageDate)) {
    todayPomos++;
  } else {
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

export function getPomoCount () {
  return window.localStorage.getItem(Constants.TODAY_POMO_ID) || '0';
}

export function getBestDailyPomoCount() {
  return window.localStorage.getItem(Constants.BEST_DAILY_POMO_ID) || '0';
}

/**
 * Updates the pomo count for the current day of the week in local storage.
 */
export function incrPomoCount () {
  const dayIdx = ((new Date()).getDay() - 1) % Constants.LENGTH_OF_WEEK;
  const weekHistory = JSON.parse(window.localStorage.getItem(Constants.WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];
  weekHistory[dayIdx]++;
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
 * Updates the pomo count for the current day of the week in local storage.
 */
export function getWeeklyHistory () {
  return JSON.parse(window.localStorage.getItem(Constants.WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];
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
 * @return The updated number of distractions
 */
export function setDistractions (todayDistractions) {
  // Update total distractions
  const distractions = Number(window.localStorage.getItem(TOTAL_DISTRACTION));
  window.localStorage.setItem(TOTAL_DISTRACTION, String(distractions + 1));

  // Update today's distractions
  const storageDate = new Date(window.localStorage.getItem(TODAY_DATE_ID));
  const today = new Date();
  if (isSameDay(today, storageDate)) {
    todayDistractions++;
  } else {
    // Update
    todayDistractions = 1;
    window.localStorage.setItem(TODAY_DATE_ID, today.toString());
  }
  window.localStorage.setItem(TODAY_DISTRACTION, String(todayDistractions));

  return todayDistractions;
}

/**
 * Updates distractions in local storage
 * @return Today's distractions
 */
export function getDistractions () {
  return window.localStorage.setItem(TODAY_DISTRACTION, String(todayDistractions));
}

/**
 * Updates distractions in local storage
 * @return Today's distractions
 */
 export function getTotalDistractions () {
  return window.localStorage.setItem(TOTAL_DISTRACTION) || 0;
}

/**
   * Reformat Date() variable to mm:dd:yyyy
   * @param {Date} toFormat date object to change
   * @returns formatted string
   */
export function formatDate (toFormat) {
  const dd = String(toFormat.getDate()).padStart(2, '0'); // date
  const mm = String(toFormat.getMonth() + 1).padStart(2, '0'); // month
  const yyyy = toFormat.getFullYear(); // year
  const formatted = mm + '/' + dd + '/' + yyyy;
  return formatted;
}

/**
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 */
function isSameDay (date1, date2) {
  const isSameDate = date1.getDate() === date2.getDate();
  const isSameMonth = date1.getMonth() === date2.getMonth();
  const isSameYear = date1.getFullYear() === date2.getFullYear();
  return isSameDate && isSameMonth && isSameYear;
}

/**
 * Check if today is in the same week as week start
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns boolean is it the same week
 */
export function isSameWeek (date1, date2) {
  const checkDate = new Date(date1);
  const weekStorage = window.localStorage.getItem(Constants.WEEK_START_ID);
  let mondayDate;
  let difference = 0;

  // iterate until previous week start is reached
  while (!isSameDay(date1, date2)) {
    checkDate.setDate(checkDate.getDate() - 1);
    if (checkDate.getDay() === 1) mondayDate = new Date(checkDate);

    // not the same week
    if (++difference === Constants.LENGTH_OF_WEEK) {
      window.localStorage.setItem(Constants.WEEK_START_ID, mondayDate);
      return false;
    }
  }
  return true;
}