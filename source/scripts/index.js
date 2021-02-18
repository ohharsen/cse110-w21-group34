/* Constants */
const START_STOP_ID = "start-stop-button";
const RESET_BTN_TXT = "✖ Reset";
const BEGIN_BTN_TXT = "▶ Begin";
const TASK_BTN_ID = "task";
const TOTAL_TASK_ID = "total-task-count";
const TODAY_TASK_ID = "today-task-count";
const WEEK_TASK_ID = "week-task-count";
const TODAY_DATE_ID = "today";
const WEEK_START_ID = "week-start";
const TASK_COMPLETE_TXT = "You've Completed a Task!!!";
const LENGTH_OF_WEEK = 7;

/**
 * Enumerated timer states
 * @enum {string}
 */
const timerOptions = {
    STOPPED: "stopped",
    POMO: "pomo",
    SHORT: "short break",
    LONG: "long break"
}

/***********  Start/Reset button ***********/
let startStopButton = document.getElementById(START_STOP_ID);
let pomoState = timerOptions.STOPPED;

if (startStopButton) {
    startStopButton.classList.toggle("break-button");
    startStopButton.addEventListener("click", function() {
        if (pomoState == timerOptions.STOPPED) {
            startTimer();
        } else {
            resetTimer();
        }
    });
}

/**
 * Toggles break styling in start-stop-button
 */
function togglePomoBreak(onBreak) {
    if (startStopButton) {
        startStopButton.classList.toggle("break-button");
    }
    return !onBreak;
}

/**
 * Starts timer upon button click
 * @todo timer-specific functionality
 */
function startTimer() {
    pomoState = timerOptions.POMO;
    if (startStopButton) { 
        startStopButton.innerHTML = RESET_BTN_TXT;
    }
    return [pomoState, RESET_BTN_TXT];
}

/**
 * Resets timer upon button click
 * @todo timer-specific functionality
 */
function resetTimer() {
    pomoState = timerOptions.STOPPED;
    if (startStopButton) {
        startStopButton.innerHTML = BEGIN_BTN_TXT;
    }
    return [pomoState, BEGIN_BTN_TXT];
}

/***********  Task Button ***********/
let taskButton = document.getElementById(TASK_BTN_ID);
let localStorage = window.localStorage;

if (taskButton) {
    taskButton.addEventListener("click", taskComplete); // upon click
}

/**
 * Task is completed upon button click
 */
function taskComplete() {
    let date1 = new Date();
    let date2 = new Date();
    let date3 = new Date();
    displayTaskComplete();
    updateLocalStorage(false, date1, date2, date3);
}

/**
 * Display pop-up window and message upon task completion
 * @todo change visual display (see UI design)
 */
function displayTaskComplete() {
    window.alert(TASK_COMPLETE_TXT);
    return TASK_COMPLETE_TXT;
}

/**
 * Reformat Date() variable to mm:dd:yyyy
 * @param Date() variable
 * @returns formatted string
 */
function format_date(to_format) {
    let dd = String(to_format.getDate()).padStart(2, "0"); // date
    let mm = String(to_format.getMonth() + 1).padStart(2, "0"); // month
    let yyyy = to_format.getFullYear(); // year
    let formatted = mm + "/" + dd + "/" + yyyy;
    return formatted;
}

/**
 * Update local storage with finished task information
 * @param boolean to clear storage or not for debugging
 * @param date1 input date object
 * @param date2 input date object
 * @param date3 input date object
 * @returns localStorage
 */
function updateLocalStorage(clear_storage = false, date1, date2, date3) {
    // date information
    let today = date1;
    let curr_date = date2;
    let temp = date3;

    let today_format = format_date(today);
    let weekStartDate;

    // storage variables
    let storage_total_task;
    let storage_today_task;
    let storage_week_task;
    let storage_today_date;
    let storage_week_start;

    if (clear_storage) {
        localStorage.clear();
    }
    
    // check if local storage is empty
    if (localStorage.length == 0) {

        // first "weekStartDate" in storage history
        if (today.getDay() == 1) { // It is Monday
            weekStartDate = today_format;
        } else { // get closest previous Monday
            if(curr_date.getDay() == 0) { // Sunday
                curr_date.setDate(curr_date.getDate() - (LENGTH_OF_WEEK - 1));
            } else {
                curr_date.setDate(curr_date.getDate() - (curr_date.getDay() - 1));
            }
            weekStartDate = format_date(curr_date);
        }

        // set local storage variables
        storage_total_task = "1";
        storage_today_task = "1";
        storage_week_task = "1";
        storage_today_date = today_format;
        storage_week_start = weekStartDate;
        

    } else {
        storage_total_task = localStorage.getItem(TOTAL_TASK_ID);
        storage_today_task = localStorage.getItem(TODAY_TASK_ID);
        storage_week_task = localStorage.getItem(WEEK_TASK_ID);
        storage_today_date = localStorage.getItem(TODAY_DATE_ID);
        storage_week_start = localStorage.getItem(WEEK_START_ID);

        if (today_format != storage_today_date) { // check if it's the same day

            // get the date difference
            let difference = 0;

            // condition: curr_date > storage_today_date
            // check for new week
            while (format_date(curr_date) != storage_week_start) { 
                curr_date.setDate(curr_date.getDate() - 1); // previous day
                if (++difference == LENGTH_OF_WEEK) break;
            }

            if (difference == LENGTH_OF_WEEK) { // CASE 1: different day, different week
                curr_date = temp;
                if(curr_date.getDay() == 0) { // Sunday
                    curr_date.setDate(curr_date.getDate() - (LENGTH_OF_WEEK - 1));
                } else {
                    curr_date.setDate(curr_date.getDate() - (curr_date.getDay() - 1));
                }
                weekStartDate = format_date(curr_date);

                // set local storage variables
                storage_total_task = String(Number(storage_total_task) + 1);
                storage_today_task = "1";
                storage_week_task = "1";
                storage_today_date = today_format;
                storage_week_start = weekStartDate;
                
            } else { // CASE 2: different day, same week

                // set local storage variables
                storage_total_task = String(Number(storage_total_task) + 1);
                storage_today_task = "1";
                storage_week_task = String(Number(storage_week_task) + 1);
                storage_today_date = today_format;
                
            }
        } else { // CASE 3: same day

            // set local storage variables
            storage_total_task = String(Number(storage_total_task) + 1);
            storage_today_task = String(Number(storage_today_task) + 1);
            storage_week_task = String(Number(storage_week_task) + 1);

        }
    }

    // update local storage
    localStorage.setItem(TOTAL_TASK_ID, storage_total_task);
    localStorage.setItem(TODAY_TASK_ID, storage_today_task);
    localStorage.setItem(WEEK_TASK_ID, storage_week_task);
    localStorage.setItem(TODAY_DATE_ID, storage_today_date);
    localStorage.setItem(WEEK_START_ID, storage_week_start);
    
    // console.log(localStorage); // for debugging

    return localStorage;
}

module.exports = { togglePomoBreak, startTimer, resetTimer, displayTaskComplete, updateLocalStorage };