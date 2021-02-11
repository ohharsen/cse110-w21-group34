/** Constants */
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

let startStopButton = document.getElementById(START_STOP_ID);
startStopButton.classList.toggle("break-button");
let pomoState = timerOptions.STOPPED;

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
function togglePomoBreak() {
    startStopButton.classList.toggle("break-button");
}

/**
 * Starts timer upon button click
 */
function startTimer() {
    pomoState = timerOptions.POMO;
    startStopButton.innerHTML = RESET_BTN_TXT;
}

/**
 * Resets timer upon button click
 */
function resetTimer() {
    pomoState = timerOptions.STOPPED;
    startStopButton.innerHTML = BEGIN_BTN_TXT;
}

module.exports = togglePomoBreak, startTimer, resetTimer;
