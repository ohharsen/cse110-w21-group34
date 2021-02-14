/* Constants */
const START_STOP_ID = "start-stop-button";
const RESET_BTN_TXT = "✖ Reset";
const BEGIN_BTN_TXT = "▶ Begin";
const TASK_BTN_ID = "task";
const TOTAL_TASK_ID = "total-task-count";
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

module.exports = { togglePomoBreak, startTimer, resetTimer };

/***********  Task Button ***********/
let taskButton = document.getElementById(TASK_BTN_ID);
let localStorage = window.localStorage;
let totalTaskCount;
let totalPomoCount; // NEEDS TO BE UPDATED BY TIMER --> TRACKS TOTAL POMOS DURING CURRENT TASK

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
}

/**
 * Update local storage with finished task information
 */
function updateLocalStorage() {
    // date information
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0"); // date
    let mm = String(today.getMonth() + 1).padStart(2, "0"); // month
    let yyyy = today.getFullYear(); // year
    today = mm + "/" + dd + "/" + yyyy;
    
    // check if local storage is empty
    if (localStorage.length == 0) {
        totalTaskCount = 0;
    } else {
        totalTaskCount = localStorage.getItem(TOTAL_TASK_ID);
    }

    localStorage.setItem(String(Number(totalTaskCount) + 1), JSON.stringify({pomos : totalPomoCount, date : today})); // add task info to local storage
    localStorage.setItem(TOTAL_TASK_ID, String(Number(totalTaskCount) + 1)); // update total task count

    // console.log(localStorage); // for debugging
}