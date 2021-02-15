
window.onload = function(){

//Sets the color of the timer
document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");

// Toggles for visibility of clock.
var isShown = true;

// Toggles for when entering break cycle.
var onBreak = false;

// Count number of pomos.
var pomoCount = 0;

// Parameters for standard pomo time durations (in seconds).
var stdWork = 10; // 1500
var stdBreak = 3; // 300
var stdExtBreak = 900; // 900

// Main countdown function.
function beginCountdown(duration, textDisplay) {
	let timer = duration; // minutes, seconds;

  let interval = setInterval(function() {
    currentTime(timer, textDisplay);

    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `${(timeFraction(timer, onBreak) * 220)} 220`);
    
    // Break from current cycle.
    if (--timer < -1) { 
        //Change color
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#34DBB3");
        clearInterval(interval);
        onBreak = true;
        // Display (but not begin) next cycle.
        if(pomoCount == 3) {
            currentTime(stdExtBreak, textDisplay);
        }
        else {
            currentTime(stdBreak, textDisplay);
        }
    }
  }, 1000);
}

// Main break function.
function beginBreak(duration, textDisplay) {
	let timer = duration; // minutes, seconds;

    

  let interval = setInterval(function() {
    currentTime(timer, textDisplay);

    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", `${(timeFraction(timer, onBreak) * 220)} 220`);
    
    if (--timer < -1) {
        clearInterval(interval);
        onBreak = false;
        //Changes the color of the timer
        document.getElementById("base-timer-path-remaining").setAttribute("stroke", "#DB2E2E");
        currentTime(stdWork, textDisplay);
    }
  }, 1000);
}

// Helper method; calculate current time.
function currentTime(timer, textDisplay) {
  let minutes, seconds;
  minutes = parseInt(timer / 60, 10);
  seconds = parseInt(timer % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  textDisplay.textContent = minutes + ":" + seconds;
}

function timeFraction(timer, onBreak){
    if (!onBreak){
        return timer/stdWork;
    }
    else{
        return timer/stdBreak;
    }
}

// Toggle fade effect.
function toggleFade() {
	// Set fade on.
	if (isShown == true) {
  	    isShown = false;
    }
  
    // Set fade off.
    else {
  	    isShown = true;
    }
}

// Fade functionality.

function fadeEffect() {

}


// -----------------------------------------------------------------------------------------

// TEMPORARY, PLACEHOLDER BUTTONS BELOW FOR TESTING
// TODO: INTEGRATE WITH OTHERS' CODE

document.getElementById("makeshiftButton").onclick = function() {
	var display = document.querySelector('#countdownText');
	if (onBreak == false) {
  	    beginCountdown(stdWork, display);
    }
    else {
  	    if(pomoCount == 3) {
    	    pomoCount = 0;
            beginBreak(stdExtBreak, display);
        }
        else {
    	    pomoCount++;
            beginBreak(stdBreak, display);
        }
    }
};



/**
$(document).ready(function() {
	$("makeshiftButton").hover(function() {
  	$("clockTimer").fadeOut(2000);
  
  });
});
*/
}