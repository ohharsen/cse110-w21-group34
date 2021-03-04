import * as Constants from './constants.js';

const taskButton = document.getElementById(Constants.TASK_BTN_ID);

let taskPomoCount = 0;

if (taskButton) {
  const today = new Date();
  taskButton.addEventListener('click', function (event) {
    taskComplete(false, today);
    event.preventDefault();
  }); // upon click
}

/**
   * Reformat Date() variable to mm:dd:yyyy
   * @param Date() variable
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
   * Task is completed upon button click
   * @param clearStorage for debugging
   * @param today current date
   * @returns local storage for debug
   */
export function taskComplete (clearStorage, today) {
  taskPomoCount = 0;
  document.getElementById('task-pomo-counter').innerHTML = taskPomoCount;
  if (clearStorage) window.localStorage.clear();

  const todayStorage = window.localStorage.getItem(Constants.TODAY_DATE_ID);
  let weekCounter = Number(window.localStorage.getItem(Constants.WEEK_TASK_ID));
  let dayCounter = Number(window.localStorage.getItem(Constants.TODAY_TASK_ID));

  if (formatDate(today) !== todayStorage) {
    if (isSameWeek(today)) { // different day, same week
      weekCounter++;
    } else { // different week
      weekCounter = 1;
    }
    dayCounter = 1;
    window.localStorage.setItem(Constants.TODAY_DATE_ID, formatDate(today));
  } else { // same day, same week
    dayCounter++;
    weekCounter++;
  }

  return updateLocalStorage(dayCounter, weekCounter);
}

export function increaseTaskPomo () {
  taskPomoCount++;
  document.getElementById('task-pomo-counter').innerHTML = taskPomoCount;
}

export function resetTaskPomo () {
  taskPomoCount = 0;
  document.getElementById('task-pomo-counter').innerHTML = taskPomoCount;
}

/**
   * Check if today is in the same week as week start
   * @param today current date
   * @returns boolean is it the same week
   */
export function isSameWeek (today) {
  const checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weekStorage = window.localStorage.getItem(Constants.WEEK_START_ID);
  let mondayDate;
  let difference = 0;

  // iterate until previous week start is reached
  while (formatDate(checkDate) !== weekStorage) {
    checkDate.setDate(checkDate.getDate() - 1); // previous day
    if (checkDate.getDay() === 1) mondayDate = formatDate(checkDate);

    // not the same week
    if (++difference === Constants.LENGTH_OF_WEEK) {
      window.localStorage.setItem(Constants.WEEK_START_ID, mondayDate);
      return false;
    }
  }
  return true;
}

/**
   * Update local storage with finished task information
   * @param dayCounter today total task count
   * @param weekCounter week total task count
   * @returns local storage for debug
   */
export function updateLocalStorage (dayCounter, weekCounter) {
  window.localStorage.setItem(Constants.TODAY_TASK_ID, String(dayCounter));
  window.localStorage.setItem(Constants.WEEK_TASK_ID, String(weekCounter));

  const totalTasks = Number(window.localStorage.getItem(Constants.TOTAL_TASK_ID)) + 1;
  window.localStorage.setItem(Constants.TOTAL_TASK_ID, String(totalTasks));

  return window.localStorage;
}

// Sets the color of the timer
document.getElementById('base-timer-path-remaining').setAttribute('stroke', '#DB2E2E');
