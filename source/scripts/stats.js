require('./startResetButton');
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
  displayTodayStats();


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

/**
 * Displays the user's statistics for the day on the statistics pane.
 * Today statistics include:
 *    - Today's pomodoros completed
 *    - Today's avg. distractions per pomodoro
 *    - Today's tasks completed
 *    - Most pomodoros completed in a single day
 */
function displayTodayStats () {
  const todayPomoElem = document.getElementById('today-pomodoros');
  const todayTasksElem = document.getElementById('today-tasks');
  const todayDistractElem = document.getElementById('today-distractions');

  const todayPomoCount = localStorage.getItem('today-pomodoros') || '0';
  const todayDistractCount = localStorage.getItem('today-distraction') || '0';
  const todayTaskCount = localStorage.getItem('today-task-count') || '0';
  // TODO: Add pomodoros completed in a single day

  todayPomoElem.textContent = todayPomoCount;
  todayDistractElem.textContent = todayDistractCount;
  todayTasksElem.textContent = todayTaskCount;
  // TODO: Display pomodoros completed in a single day
}