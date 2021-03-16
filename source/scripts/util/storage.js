import * as Constants from '../constants.js';

export const BEST_DAILY_POMO_ID = 'best-daily-pomo-count';
export const TOTAL_POMO_ID = 'total-pomo-count';
export const TOTAL_TASK_ID = 'total-task-count';
export const TODAY_TASK_ID = 'today-task-count';
export const WEEK_HISTORY = 'week-history';
export const TODAY_DATE_ID = 'today';
export const WEEK_START_ID = 'week-start';
export const TODAY_POMO_ID = 'today-pomo-count';
export const TOTAL_CYCLE_ID = 'total-cycle-count';
export const TOTAL_INTERRUPTION = 'total-interruption';
export const TODAY_INTERRUPTION = 'today-interruption';

/**
 * Update local storage with finished task information
 */
export function incrTasks () {
  let todaysTasks = getTasksCount();

  if (isStorageDateToday()) {
    todaysTasks++;
  } else { // same day, same week
    todaysTasks = 1;
    setTodayStorageDate();
  }

  // Update today's task count
  window.localStorage.setItem(TODAY_TASK_ID, String(todaysTasks));

  // Update total task count
  const totalTasks = Number(window.localStorage.getItem(TOTAL_TASK_ID)) + 1;
  window.localStorage.setItem(TOTAL_TASK_ID, String(totalTasks));
}

/**
 * Getter method for number of tasks completed today
 * @returns {Number} storage data
 */
export function getTasksCount () {
  return Number(window.localStorage.getItem(TODAY_TASK_ID));
}

/**
 * Getter method for total tasks completed
 * @return {Number} storage data
 */
export function getTotalTasksCount () {
  return Number(window.localStorage.getItem(TOTAL_TASK_ID));
}

/**
 * Increments completed Pomodoros for today, the current week, and total in
 * local storage.
 * @return number of pomos completed today
 */
export function incrPomoCount () {
  let todayPomos = getPomoCount();

  // Update today's pomo count
  if (isStorageDateToday()) {
    todayPomos++;
  } else {
    todayPomos = 1;
    setTodayStorageDate();
  }
  window.localStorage.setItem(TODAY_POMO_ID, String(todayPomos));

  // Update total pomo count
  window.localStorage.setItem(TOTAL_POMO_ID, String(Number(window.localStorage.getItem(TOTAL_POMO_ID)) + 1));
  if (Number(window.localStorage.getItem(BEST_DAILY_POMO_ID)) < todayPomos) {
    window.localStorage.setItem(BEST_DAILY_POMO_ID, todayPomos);
  }

  // Check if we're in the same week
  const today = new Date();
  const recentMonday = getRecentMonday(today);
  if (!isSameDay(getWeekStartDate(), recentMonday)) setWeekStartDate(recentMonday);

  // Update weekly history
  const dayIdx = (today.getDay() - 1) % Constants.LENGTH_OF_WEEK;
  const weekHistory = JSON.parse(window.localStorage.getItem(WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];
  weekHistory[dayIdx]++;
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));

  return todayPomos;
}

/**
 * Getter method for number of pomos completed today
 * @returns {Number} storage data
 */
export function getPomoCount () {
  return Number(window.localStorage.getItem(TODAY_POMO_ID));
}

/**
 * Getter method for total pomos completed
 * @returns {Number} storage data
 */
export function getTotalPomoCount () {
  return Number(window.localStorage.getItem(TOTAL_POMO_ID));
}

/**
 * Getter method for best daily count
 * @returns {Number} storage data
 */
export function getBestDailyPomoCount () {
  return Number(window.localStorage.getItem(BEST_DAILY_POMO_ID));
}

/**
 * Getter method for week history of pomos completed
 * @returns {Array}  storage data
 */
export function getWeeklyHistory () {
  return JSON.parse(window.localStorage.getItem(WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];
}

/**
 * Reset week history array to zeros
 */
export function clearWeeklyHistory () {
  const zeros = [0, 0, 0, 0, 0, 0, 0];
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(zeros));
}

/**
 * Updates interruptions in local storage
 * @param {Number} amount The number of interruptions today
 * @return The updated number of interruptions
 */
export function incrInterruptions () {
  let todayInterruptions = getInterruptions();

  // Update today's interruptions
  if (isStorageDateToday()) {
    todayInterruptions++;
  } else {
    todayInterruptions = 1;
    setTodayStorageDate();
  }
  window.localStorage.setItem(TODAY_INTERRUPTION, String(todayInterruptions));

  // Update total interruptions
  const interruptions = Number(window.localStorage.getItem(TOTAL_INTERRUPTION));
  window.localStorage.setItem(TOTAL_INTERRUPTION, String(interruptions + 1));
}

/**
 * Getter method for today's interruptions
 * @return {Number} storage data
 */
export function getInterruptions () {
  return Number(window.localStorage.getItem(TODAY_INTERRUPTION));
}

/**
 * Getter method for total interruptions
 * @return {Number} storage data
 */
export function getTotalInterruptions () {
  return Number(window.localStorage.getItem(TOTAL_INTERRUPTION));
}

/**
 * Getter method for date in storage that counts as today
 * @returns {Date} storage data
 */
export function getTodayStorageDate () {
  return new Date(window.localStorage.getItem(TODAY_DATE_ID) || new Date(0));
}

/**
 * Updates date in storage to today's date
 */
export function setTodayStorageDate () {
  const today = new Date();
  window.localStorage.setItem(TODAY_DATE_ID, today.toString());
}

/**
 * Getter method for date in storage that marks the start of a week
 * @returns {Date} storage data
 */
export function getWeekStartDate () {
  return new Date(window.localStorage.getItem(WEEK_START_ID)) || new Date(0);
}

/**
 * Updates week start date in storage to most recent Monday
 */
export function setWeekStartDate (monday) {
  window.localStorage.setItem(WEEK_START_ID, monday.toString());
  clearWeeklyHistory();
}

/**
 * Checks if the date in storage is the same as today's date
 * @returns {Boolean} true if they are the same, false otherwise
 */
export function isStorageDateToday () {
  return isSameDay(new Date(), getTodayStorageDate());
}

/**
 * Checks if two date values are the same MM/DD/YYYY
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Boolean} true if they are the same, false otherwise
 */
export function isSameDay (date1, date2) {
  const isSameDate = date1.getDate() === date2.getDate();
  const isSameMonth = date1.getMonth() === date2.getMonth();
  const isSameYear = date1.getFullYear() === date2.getFullYear();
  return isSameDate && isSameMonth && isSameYear;
}

/**
 * Get most recent Monday from a given date
 * @param {Date} date any date
 * @returns {Date} the most recent Monday
 */
export function getRecentMonday (date) {
  const checkDate = new Date(date);

  // iterate until previous week start is reached
  while (checkDate.getDay() !== 1) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  return checkDate;
}
