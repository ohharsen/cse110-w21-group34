import * as Constants from './constants.js';
import * as Storage from './util/storage.js';
import { updateStats } from './stats.js';

const taskButton = document.getElementById(Constants.TASK_BTN_ID);

let taskPomoCount = 0;

/* Event listener */
if (taskButton) {
  toggleTaskButtonDisabled(true);
  taskButton.addEventListener('click', function (event) {
    completeTask();
    event.preventDefault();
    document.getElementById('animation-overlay').style.display = 'flex';
    setTimeout(function () {
      document.getElementById('animation-overlay').style.display = 'none';
    }, 3000);
  }); // upon click
}

/**
 * Increases the number of pomodoros completed for the current task
 */
export function increaseTaskPomo () {
  taskPomoCount++;
  document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML = taskPomoCount;
}

/**
 * Resets the number of pomodoros completed to 0 for the current task
 */
export function resetTaskPomo () {
  taskPomoCount = 0;
  document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML = taskPomoCount;
  toggleTaskButtonDisabled(true);
}

/**
 * Toggles task button
 * @param {Boolean} disabled - Allows caller to select whether button is disabled
 */
export function toggleTaskButtonDisabled (disabled) {
  if (taskPomoCount === 0) disabled = true;
  taskButton.disabled = disabled;
}

/**
 * Resets pomo count for the task, updates storage / stats, and disables button
 */
export function completeTask () {
  taskPomoCount = 0;
  document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML = taskPomoCount;

  Storage.incrTasks();
  toggleTaskButtonDisabled(true);
  updateStats();
}
