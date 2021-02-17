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

// localStorage.clear(); // for debugging

if (taskButton) {
    taskButton.addEventListener("click", taskComplete); // upon click
}

/**
 * Task is completed upon button click
 */
function taskComplete() {
    displayTaskComplete();
    updateLocalStorage();
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
 */
function updateLocalStorage() {
    // date information
    let today = new Date();
    let today_format = format_date(today);
    let weekStartDate;
    
    // check if local storage is empty
    if (localStorage.length == 0) {

        // first "weekStartDate" in storage history
        if (today.getDay() == 1) { // It is Monday
            weekStartDate = today_format;
        } else { // get closest previous Monday
            let curr_date = today;
            while (curr_date.getDay() != 1) {
                curr_date.setDate(curr_date.getDate() - 1); // previous day
            }
            weekStartDate = format_date(curr_date);
        }

        // set local storage
        localStorage.setItem(TOTAL_TASK_ID, "1");
        localStorage.setItem(TODAY_TASK_ID, "1");
        localStorage.setItem(WEEK_TASK_ID, "1");
        localStorage.setItem(TODAY_DATE_ID, today_format);
        localStorage.setItem(WEEK_START_ID, weekStartDate);

    } else {
        let storage_total_task = localStorage.getItem(TOTAL_TASK_ID);
        let storage_today_task = localStorage.getItem(TODAY_TASK_ID);
        let storage_week_task = localStorage.getItem(WEEK_TASK_ID);
        let storage_today_date = localStorage.getItem(TODAY_DATE_ID);

        if (today_format != storage_today_date) { // check if it's the same day

            // get the date difference
            let difference = 0;
            let curr_date = today;

            // condition: curr_date > storage_today_date
            while (format_date(curr_date) != storage_today_date) { 
                curr_date.setDate(curr_date.getDate() - 1); // previous day
                difference++;
            }

            if (difference >= 7) { // CASE 1: different day, different week
                curr_date = today;
                while (curr_date.getDay() != 1) {
                    curr_date.setDate(curr_date.getDate() - 1); // previous day
                }
                weekStartDate = format_date(curr_date);

                // set local storage
                localStorage.setItem(TOTAL_TASK_ID, String(Number(storage_total_task) + 1));
                localStorage.setItem(TODAY_TASK_ID, "1");
                localStorage.setItem(WEEK_TASK_ID, "1");
                localStorage.setItem(TODAY_DATE_ID, today_format);
                localStorage.setItem(WEEK_START_ID, weekStartDate);
            } else { // CASE 2: different day, same week
                // set local storage
                localStorage.setItem(TOTAL_TASK_ID, String(Number(storage_total_task) + 1));
                localStorage.setItem(TODAY_TASK_ID, "1");
                localStorage.setItem(WEEK_TASK_ID, String(Number(storage_week_task) + 1));
                localStorage.setItem(TODAY_DATE_ID, today_format);
            }
        } else { // CASE 3: same day
            // set local storage
            localStorage.setItem(TOTAL_TASK_ID, String(Number(storage_total_task) + 1));
            localStorage.setItem(TODAY_TASK_ID, String(Number(storage_today_task) + 1));
            localStorage.setItem(WEEK_TASK_ID, String(Number(storage_week_task) + 1));
        }
    }

    // console.log(localStorage); // for debugging

    return today_format;
}

module.exports = { togglePomoBreak, startTimer, resetTimer, displayTaskComplete, updateLocalStorage };