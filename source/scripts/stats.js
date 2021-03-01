require('./startResetButton');

const timerBlock = document.getElementsByClassName('center-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');

const totalPomoElem = document.getElementById('total-pomodoros');
const totalTasksElem = document.getElementById('total-tasks');
const totalDistractElem = document.getElementById('total-distractions');

statsOpenButton.onclick = openStatsPane;
statsCloseButton.onclick = closeStatsPane;

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
function openStatsPane () {
  /* we have
    toal task count
    today task count,
    week task count,
    week start

    need
    total/day/week interuptions
    total pomos
    way to store daily weekly
  */

  displayTotalStats();

  const totalTC = localStorage.getItem('total-task-count');
  const todayTC = localStorage.getItem('today-task-count');
  const weekTC = localStorage.getItem('week-task-count');
  const weekstart = localStorage.getItem('week-start');
  console.log(totalTC);
  console.log(todayTC);
  console.log(weekTC);
  console.log(weekstart);

  timerBlock.classList.remove('slide-close');
  statsPane.classList.remove('slide-close');
  timerBlock.classList.add('slide-open');
  statsPane.classList.add('slide-open');
}

/* istanbul ignore next */
/**
 * Closes the statistics pane.
 */
function closeStatsPane () {
  timerBlock.classList.remove('slide-open');
  statsPane.classList.remove('slide-open');
  timerBlock.classList.add('slide-close');
  statsPane.classList.add('slide-close');
}

/**
 * Displays the user's current all-time statistics on the statistics pane.
 * Total statistics include:
 *    - Total pomodoros completed
 *    - Total avg. distractions per pomodoro
 *    - Total tasks completed
 *    - Most pomodoros completed in a single day
 */
function displayTotalStats () {
  const totalPomoCount = localStorage.getItem(TOTAL_POMO_ID) || '0';
  const totalDistractCount = localStorage.getItem(TOTAL_DISTRACTION) || '0';
  const totalTaskCount = localStorage.getItem(TOTAL_TASK_ID) || '0';
  // TODO: Add most pomodoros completed in a single day

  totalPomoElem.textContent = totalPomoCount;
  totalDistractElem.textContent = (Number(totalDistractCount) / (Number(totalPomoCount) || 1)).toFixed(2);
  totalTasksElem.textContent = totalTaskCount;
  // TODO: Display most pomodoros completed in a single day
}

module.exports = {
  displayTotalStats: displayTotalStats
};
