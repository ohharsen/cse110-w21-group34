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
 */
export function incrTasks () {
  const todayStorage = Storage.getTodayStorageDate();
  let weekCounter = Storage.getWeekCounter();
  let dayCounter = Storage.getDayCounter();
  let dayOfWeek = ((new Date()).getDay() - 1) % Constants.LENGTH_OF_WEEK; // Day of week starting on Mon

  if (isSameDay(today, todayStorage)) {
    if (!isSameWeek(today)) Storage.clearWeeklyHistory();
    dayCounter = 1;
    Storage.setTodayStorageDate(today);
  } else { // same day, same week
    dayCounter++;
    weekCounter++;
  }

  // Update today's task count
  window.localStorage.setItem(TODAY_TASK_ID, String(dayCounter));
  window.localStorage.setItem(WEEK_TASK_ID, String(weekCounter));

  // Update total task count
  const totalTasks = Number(window.localStorage.getItem(TOTAL_TASK_ID)) + 1;
  window.localStorage.setItem(TOTAL_TASK_ID, String(totalTasks));
}

export function getTasksCount() {
  return window.localStorage.getItem(TODAY_TASK_ID) || '0';
}

/**
 * 
 * @returns Total tasks completed
 */
export function getTotalTasksCount () {
  return window.localStorage.getItem(TOTAL_TASK_ID) || '0';
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
  return window.localStorage.getItem(TODAY_POMO_ID) || '0';
}

export function getBestDailyPomoCount() {
  return window.localStorage.getItem(BEST_DAILY_POMO_ID) || '0';
}

/**
 * Updates the pomo count for the current day of the week in local storage.
 */
export function incrPomoCount () {
  const dayIdx = ((new Date()).getDay() - 1) % Constants.LENGTH_OF_WEEK;
  const weekHistory = JSON.parse(window.localStorage.getItem(WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];

  weekHistory[dayIdx]++;
  window.localStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
 * Updates the pomo count for the current day of the week in local storage.
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

export function getDayCounter () {
  return Number(window.localStorage.getItem(TODAY_TASK_ID));
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
function isSameWeek (date1, date2) {
  const checkDate = new Date(date1);
  let lastMonday;
  let difference = 0;

  // iterate until previous week start is reached
  while (!isSameDay(date1, date2)) {
    checkDate.setDate(checkDate.getDate() - 1);
    if (checkDate.getDay() === 1) mondayDate = new Date(checkDate);
    difference++;
    if (difference === Constants.LENGTH_OF_WEEK) {
      // TODO: move this somewhere else
      window.localStorage.setItem(Constants.WEEK_START_ID, mondayDate);
      return false;
    }
  }
  return true;
}