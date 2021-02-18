// Variables
var isShown = true;
var onBreak = false;
var pomoCount = 0;     //# of pomos covered so far (orig. 0)
var stdWork = 1500;    //# of seconds in a work pomo (orig. 1500)
var stdBreak = 300;    //# of seconds in a short break (orig. 300)
var stdExtBreak = 900; //# of seconds in a long break (orig. 900)

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

window.onload = function(){

//Sets the color of the timer
document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");

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
 */
function startTimer() {
    if (startStopButton) { 
        startStopButton.innerHTML = RESET_BTN_TXT;

        // Copied from buttonTest
        var display = document.querySelector('#countdownText');
        if (onBreak == false) {
            pomoState = timerOptions.POMO;
            beginCountdown(stdWork, display);
        }
        else {
            if(pomoCount == 3) {
                pomoCount = 0;
                pomoState = timerOptions.LONG;
                beginBreak(stdExtBreak, display);
            }
            else {
                pomoCount++;
                pomoState = timerOptions.SHORT;
                beginBreak(stdBreak, display);
            }
        }
        //
    }
    return [pomoState, RESET_BTN_TXT];
}

/**
 * Resets timer upon button click
 */
function resetTimer() {
    pomoState = timerOptions.STOPPED;
    if (startStopButton) {
        startStopButton.innerHTML = BEGIN_BTN_TXT;
    }
    return [pomoState, pomoCount, BEGIN_BTN_TXT];
}


/**
 * Begins the countdown for a work cycle
 * @param {*} duration The duration of the countdown 
 * @param {*} textDisplay The component on which the remaining time is outputted
 */
function beginCountdown(duration, textDisplay) {
	let timer = duration; // minutes, seconds;

    var interval = setInterval(function() {
    currentTime(timer, textDisplay);
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `${(timeFraction(timer, onBreak) * 220)} 220`);
   
    // Press break in middle of countdown.
    if (pomoState == timerOptions.STOPPED) {
        clearInterval(interval);
        pomoCount = 0;
        onBreak = false;
        currentTime(stdWork, textDisplay);
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `220 220`);
    }    
    
    if (--timer < -1) { 
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#34DBB3");
        clearInterval(interval);
        onBreak = true;
        startStopButton.innerHTML = BEGIN_BTN_TXT; 
        pomoState = timerOptions.STOPPED;
        if(pomoCount == 3) {
            currentTime(stdExtBreak, textDisplay);
        }
        else {
            currentTime(stdBreak, textDisplay);
        }
    }
  }, 1000);
}

/**
 * Begins the countdown for a break cycle
 * @param {*} duration The duration of the countdown 
 * @param {*} textDisplay The component on which the remaining time is outputted
 */
function beginBreak(duration, textDisplay) {
	let timer = duration; // minutes, seconds;
    let interval = setInterval(function() {
    currentTime(timer, textDisplay);
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `${(timeFraction(timer) * 220)} 220`);
    
    // Press break in middle of countdown.
    if (pomoState == timerOptions.STOPPED) {
        clearInterval(interval);
        pomoCount = 0;
        onBreak = false;
        currentTime(stdWork, textDisplay);
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `220 220`);
        //Changes the color of the timer
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");
    }

    if (--timer < -1) {
        clearInterval(interval);
        startStopButton.innerHTML = BEGIN_BTN_TXT; 
        pomoState = timerOptions.STOPPED;
        onBreak = false;
        //Changes the color of the timer
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");
        currentTime(stdWork, textDisplay);
    }
  }, 1000);
}

}

/**
 * Displays the amount of time remaining 
 * @param {*} timer The time to be displayed 
 * @param {*} textDisplay The component on which the remaining time is displayed
 */
function currentTime(timer, textDisplay) {
    let minutes, seconds;
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    textDisplay.textContent = minutes + ":" + seconds;
    return textDisplay.textContent;
}

/**
 * Returns the fraction of the time remaining for the current countdown
 * @param {*} timer The amont of time on the timer 
 */
function timeFraction(timer){
    if (pomoState == timerOptions.POMO){
        return timer/stdWork;
    }
    else if(pomoState == timerOptions.LONG){
        return timer/stdExtBreak;
    }
    else{
        return timer/stdBreak;
    }
}

module.exports = { togglePomoBreak, startTimer, resetTimer };