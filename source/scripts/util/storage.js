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
  window.localStorage.setItem(Constants.TODAY_TASK_ID, String(dayCounter));
  window.localStorage.setItem(Constants.WEEK_TASK_ID, String(weekCounter));

  const totalTasks = Number(window.localStorage.getItem(Constants.TOTAL_TASK_ID)) + 1;
  window.localStorage.setItem(Constants.TOTAL_TASK_ID, String(totalTasks));

  const weekHistory = JSON.parse(window.localStorage.getItem(Constants.WEEK_HISTORY));
  ++weekHistory[dayOfWeek];
  window.localStorage.setItem(Constants.WEEK_HISTORY, JSON.stringify(weekHistory));
  updateStats();
  return window.localStorage;
}

/**
 * Update's pomo count for today in local storage
 * @param {Number} todayPomos The number of daily current pomos completed
 * @param {String} todayStorage updatePomoCount the local storage date for the current day
 * @return number of pomos completed today
 */
 export function setPomoCount (todayPomos, todayStorage) {
  // update pomo cycle day count
  const today = formatDate(new Date());
  // case if we are on same day
  if (today === todayStorage) {
    todayPomos++;
  } else { // case if we are on different day
    todayPomos = 1;
    window.localStorage.setItem(Constants.TODAY_DATE_ID, today);
  }
  window.localStorage.setItem(Constants.TODAY_POMO_ID, String(todayPomos));
  window.localStorage.setItem(Constants.TOTAL_POMO_ID, String(Number(window.localStorage.getItem(Constants.TOTAL_POMO_ID)) + 1));
  if (Number(window.localStorage.getItem(Constants.BEST_DAILY_POMO_ID)) < todayPomos) {
    window.localStorage.setItem(Constants.BEST_DAILY_POMO_ID, todayPomos);
  }

  return todayPomos;
}

/**
 * Updates the pomo count for the current day of the week in local storage.
 */
 export function incrDailyPomoCount () {
  const dayIdx = ((new Date()).getDay() - 1) % Constants.LENGTH_OF_WEEK;
  const weekHistory = JSON.parse(window.localStorage.getItem(Constants.WEEK_HISTORY)) || [0, 0, 0, 0, 0, 0, 0];

  weekHistory[dayIdx]++;
  window.localStorage.setItem(Constants.WEEK_HISTORY, JSON.stringify(weekHistory));
}

/**
 * Reset week history array to zeros
 */
 export function clearWeeklyHistory () {
  const zeros = [0, 0, 0, 0, 0, 0, 0];
  window.localStorage.setItem(Constants.WEEK_HISTORY, JSON.stringify(zeros));
}

/**
 * Updates total cycles in local storage
 * @returns the updated number of total cycles
 */
export function incrTotalCycles () {
  const totalCycles = Number(window.localStorage.getItem(Constants.TOTAL_CYCLE_ID)) + 1;
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
  const today = formatDate(new Date());
  if (today === todayStorage) {
    todayDistractions++;
  } else {
    // Update
    todayDistractions = 1;
    window.localStorage.setItem(TODAY_DATE_ID, today);
  }
  window.localStorage.setItem(TODAY_DISTRACTION, String(todayDistractions));

  return todayDistractions;
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
