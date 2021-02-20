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

/**************  Statistics Frontend ***************/
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');
const statsPane = document.getElementById('stats-container');

statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/**
 * Opens the statistics pane.
 */
function openStatsPane() {
    statsPane.setAttribute('style', 'left: calc(100vw - 25vw - 32px);');
}

/**
 * Closes the statistics pane.
 */
function closeStatsPane() {
    statsPane.setAttribute('style', 'left: 100vw;');
}

/**
 * A demo function for frontend testing
 */
function testDom(){
    let titleEl = document.querySelector("title");
    titleEl.innerText = "Test Text";
}

module.exports = { togglePomoBreak, startTimer, resetTimer, testDom };