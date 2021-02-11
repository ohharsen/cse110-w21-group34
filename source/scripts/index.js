/* Constants */
const START_STOP_ID = "start-stop-button";
const RESET_BTN_TXT = "✖ Reset";
const BEGIN_BTN_TXT = "▶ Begin";

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

startStopButton.classList.toggle("break-button");
startStopButton.addEventListener("click", function() {
    if (pomoState == timerOptions.STOPPED) {
        startTimer();
    } else {
        resetTimer();
    }
});

/**
 * Toggles break styling in start-stop-button
 */
function togglePomoBreak(onBreak) {
    startStopButton.classList.toggle("break-button");
    return !onBreak;
}

/**
 * Starts timer upon button click
 * @todo timer-specific functionality
 */
function startTimer() {
    pomoState = timerOptions.POMO;
    startStopButton.innerHTML = RESET_BTN_TXT;
    
    return [pomoState, startStopButton.innerHTML];
}

/**
 * Resets timer upon button click
 * @todo timer-specific functionalitys
 */
function resetTimer() {
    pomoState = timerOptions.STOPPED;
    startStopButton.innerHTML = BEGIN_BTN_TXT;

    return [pomoState, startStopButton.innerHTML];
}

module.exports = { togglePomoBreak, startTimer, resetTimer };
