import * as Constants from './constants.js';
import * as Storage from './util/storage.js';
import { updateStats } from './stats.js';

const taskButton = document.getElementById(Constants.TASK_BTN_ID);

let taskPomoCount = 0;

// Sets the color of the timer
document.getElementById('base-timer-path-remaining').setAttribute('stroke', 'var(--red)');

/**
 * Increases the number of pomodoros completed for the current task.
 */
export function increaseTaskPomo () {
  taskPomoCount++;
  document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML = taskPomoCount;
}

/**
 * Resets the number of pomodoros completed to 0 for the current task.
 */
export function resetTaskPomo () {
  taskPomoCount = 0;
  document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML = taskPomoCount;
  toggleTaskButtonDisabled(true);
}

if (taskButton) {
  const today = new Date();
  toggleTaskButtonDisabled(true);
  taskButton.addEventListener('click', function (event) {
    taskComplete(today);
    event.preventDefault();
    document.getElementById('animation-overlay').style.display = 'flex';
    setTimeout(function () {
      document.getElementById('animation-overlay').style.display = 'none';
    }, 3000);
  }); // upon click
}

/**
 * Disables or enables task button
 * @param {Boolean} disabled parameter
 */

export function toggleTaskButtonDisabled (disabled) {
  if (taskPomoCount === 0) disabled = true;
  taskButton.disabled = disabled;
}

/**
   * Task is completed upon button click
   * @param {Date} today current date
   * @returns local storage for debug
   */
export function taskComplete (today) {
  taskPomoCount = 0;
  document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML = taskPomoCount;

  const todayStorage = Storage.getTodayStorageDate();
  let weekCounter = Storage.getWeekCounter();
  let dayCounter = Storage.getDayCounter();
  let dayOfWeek = today.getDay();

  if (dayOfWeek === 0) {
    dayOfWeek = Constants.LENGTH_OF_WEEK;
  }

  dayOfWeek--;

  if (today !== todayStorage) {
    if (isSameWeek(today)) { // different day, same week
      weekCounter++;
    } else { // different week
      weekCounter = 1;
      Storage.clearWeeklyHistory();
    }
    dayCounter = 1;
    Storage.setTodayStorageDate(today);
  } else { // same day, same week
    dayCounter++;
    weekCounter++;
  }

  toggleTaskButtonDisabled(true);
  return Storage.updateTasks(dayCounter, weekCounter, dayOfWeek);
}

/**
   * Check if today is in the same week as week start
   * @param {Date} today current date
   * @returns boolean is it the same week
   */
export function isSameWeek (today) {
  const checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekStorage = Storage.getWeekStorageDate();
  let mondayDate;
  let difference = 0;

  // iterate until previous week start is reached
  while (checkDate !== weekStorage) {
    checkDate.setDate(checkDate.getDate() - 1); // previous day
    if (checkDate.getDay() === 1) mondayDate = checkDate;

    // not the same week
    if (++difference === Constants.LENGTH_OF_WEEK) {
      Storage.setWeekStorageDate(mondayDate);
      return false;
    }
  }
  return true;
}
