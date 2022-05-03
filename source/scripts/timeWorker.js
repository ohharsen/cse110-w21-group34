// intervalID: The identifier of the timer(count down action) you want to cancel
let timerInterval;

// Listen for start/stop requests
onmessage = (e) => {
  const {
    start,
    duration
  } = e.data;

  if (start) {
    startTimer(duration);
  } else {
    clearInterval(timerInterval);
  }
};

/**
 * Starts a timer for the given duration and sends the time left
 * every second as a message
 * @param {Number} duration - Amount of time left
 */
function startTimer (duration) {
  let timeLeft = duration;
  timerInterval = setInterval(() => {
    timeLeft--;// decrement timeLeft by 1 
    postMessage({ timeLeft: timeLeft });
    if (timeLeft < 0) clearInterval(timerInterval);
  }, 1000);
}
