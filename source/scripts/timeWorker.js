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
 * every second as a message.
 * @param {number} duration
 */
function startTimer (duration) {
  let timeLeft = duration;
  timerInterval = setInterval(() => {
    timeLeft--;
    postMessage({ timeLeft: timeLeft });
    if (timeLeft < 0) clearInterval(timerInterval);
  }, 1000);
}
