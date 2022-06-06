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
export const ZEROS = [0, 0, 0, 0, 0, 0, 0];

/**
 * Setter method for counters
 * @param {String} counterID - The key for a counter item in storage
 * @param {Number} counter - The new value for the key
 */
export function setCounter (counterID, counter) {
  window.localStorage.setItem(counterID, String(counter));
}

/**
 * Setter method for dates
 * @param {String} dateID - The key for a date item in storage
 * @param {Date} date - The new value for the key
 */
export function setDate (dateID, date) {
  window.localStorage.setItem(dateID, date.toString());
}

/**
 * Setter method for the week history
 * @param {Number[]} weekHistory - Pomos completed on each day of the week
 */
export function setWeekHistory (weekHistory) {
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
 * Getter method for counters
 * @param {String} counterID - The key for a counter item in storage
 * @returns {Number} the value for the key in storage
 */
export function getCounter (counterID) {
  return Number(window.localStorage.getItem(counterID));
}

/**
 * Getter method for dates
 * @param {String} dateID - The key for a date item in storage
 * @returns {Date} the value for the key in storage
 */
export function getDate (dateID) {
  return new Date(window.localStorage.getItem(dateID) || new Date(0));
}

/**
 * Getter method for the week history
 * @returns {Number[]} Pomos completed on each day of the week
 */
export function getWeekHistory () {
  return JSON.parse(window.localStorage.getItem(WEEK_HISTORY)) || ZEROS;
}

/**
 * Updates local storage with finished task information
 */
export function incrTasks () {
  updateStorage();
  setCounter(TODAY_TASK_ID, getCounter(TODAY_TASK_ID) + 1); // incrementing todays tasks by one
  setCounter(TOTAL_TASK_ID, getCounter(TOTAL_TASK_ID) + 1); // incrementing total tasks by one
}

/**
 * Increments completed Pomodoros for today, the current week, and total in
 * local storage
 */
export function incrPomoCount () {
  updateStorage();

  const todayPomos = getCounter(TODAY_POMO_ID) + 1;
  setCounter(TODAY_POMO_ID, todayPomos); // increment todays pomo count
  setCounter(TOTAL_POMO_ID, getCounter(TOTAL_POMO_ID) + 1); // increment total pomo count

  if (getCounter(BEST_DAILY_POMO_ID) < todayPomos) setCounter(BEST_DAILY_POMO_ID, todayPomos);

  // Update week history
  const today = new Date();
  const dayIdx = ((today.getDay() - 1) + Constants.LENGTH_OF_WEEK) % Constants.LENGTH_OF_WEEK;
  const weekHistory = getWeekHistory();
  weekHistory[dayIdx]++;
  setWeekHistory(weekHistory);
}

/**
 * Increments interruptions for today and in total
 */
export function incrInterruptions () {
  updateStorage();
  setCounter(TODAY_INTERRUPTION, getCounter(TODAY_INTERRUPTION) + 1); // increments todays interruptions
  setCounter(TOTAL_INTERRUPTION, getCounter(TOTAL_INTERRUPTION) + 1); // increments total interruptions
}

/**
 * Updates storage today counters and dates if today's date has changed
 */
export function updateStorage () {
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
export function isStorageDateToday () {
  return isSameDay(new Date(), getDate(TODAY_DATE_ID));
}

/**
 * Checks if two date values are the same MM/DD/YYYY
 * @param {Date} date1 - The first date to compare
 * @param {Date} date2 - The second date to compare
 * @returns {Boolean} true if they are the same, false otherwise
 */
export function isSameDay (date1, date2) {
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
export function getRecentMonday (date) {
  const checkDate = new Date(date);

  // iterate until previous week start is reached
  while (checkDate.getDay() !== 1) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  return checkDate;
}
