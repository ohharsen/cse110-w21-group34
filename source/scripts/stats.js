const timerBlock = document.getElementsByClassName('center-container')[0];
const counterBlock = document.getElementsByClassName('counters-container')[0];
const statsPane = document.getElementById('stats-container');
const statsOpenButton = document.getElementById('stats-open-button');
const statsCloseButton = document.getElementById('stats-close-button');

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
  const totalTC = localStorage.getItem('total-task-count');
  const todayTC = localStorage.getItem('today-task-count');
  const weekTC = localStorage.getItem('week-task-count');
  const weekstart = localStorage.getItem('week-start');
  console.log(totalTC);
  console.log(todayTC);
  console.log(weekTC);
  console.log(weekstart);

  timerBlock.classList.remove('slide-close');
  counterBlock.classList.remove('slide-close');
  statsPane.classList.remove('slide-close');
  timerBlock.classList.add('slide-open');
  counterBlock.classList.add('slide-open');
  statsPane.classList.add('slide-open');
}

/* istanbul ignore next */
/**
 * Closes the statistics pane.
 */
function closeStatsPane () {
  timerBlock.classList.remove('slide-open');
  counterBlock.classList.remove('slide-open');
  statsPane.classList.remove('slide-open');
  timerBlock.classList.add('slide-close');
  counterBlock.classList.add('slide-close');
  statsPane.classList.add('slide-close');
}

module.exports = {
  openStatsPane,
  closeStatsPane
}