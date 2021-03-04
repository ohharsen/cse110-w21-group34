/* Constants */
/* eslint no-unused-vars: "off" */
const START_STOP_ID = 'start-stop-button';
const RESET_BTN_TXT = '✖ Reset';
const BEGIN_BTN_TXT = '▶ Begin';
const TASK_BTN_ID = 'task';
const TOTAL_TASK_ID = 'total-task-count';
const TODAY_TASK_ID = 'today-task-count';
const WEEK_TASK_ID = 'week-task-count';
const TODAY_DATE_ID = 'today';
const WEEK_START_ID = 'week-start';
const TODAY_POMO_ID = 'today-pomo-count';
const DISTRACTION = 'total-distraction';
const TODAY_DISTRACTION = 'today-distraction';
const LENGTH_OF_WEEK = 7;
const stdWork = 1500; // # of seconds in a work pomo (orig. 1500)
const stdBreak = 300; // # of seconds in a short break (orig. 300)
const stdExtBreak = 900; // # of seconds in a long break (orig. 900)

// Variables
const onBreak = false;
const pomoCount = 0; // # of pomos covered so far (orig. 0)
const taskPomoCount = 0; // # of pomos for current task (orig. 0)

/**
 * Enumerated timer states
 * @enum {string}
 */
const timerOptions = {
  STOPPED: 'stopped',
  POMO: 'pomo',
  SHORT: 'short break',
  LONG: 'long break'
};

const taskButton = document.getElementById(TASK_BTN_ID);
const localStorage = window.localStorage;

/* Make global for testing */
global.START_STOP_ID = START_STOP_ID;
global.RESET_BTN_TXT = RESET_BTN_TXT;
global.BEGIN_BTN_TXT = BEGIN_BTN_TXT;
global.TASK_BTN_ID = TASK_BTN_ID;
global.TOTAL_TASK_ID = TOTAL_TASK_ID;
global.TODAY_TASK_ID = TODAY_TASK_ID;
global.WEEK_TASK_ID = WEEK_TASK_ID;
global.TODAY_DATE_ID = TODAY_DATE_ID;
global.WEEK_START_ID = WEEK_START_ID;
global.TODAY_POMO_ID = TODAY_POMO_ID;
global.DISTRACTION = DISTRACTION;
global.TODAY_DISTRACTION = TODAY_DISTRACTION;
global.LENGTH_OF_WEEK = LENGTH_OF_WEEK;
global.stdWork = stdWork;
global.stdBreak = stdBreak;
global.stdExtBreak = stdExtBreak;
global.onBreak = onBreak;
global.pomoCount = pomoCount;
global.taskPomoCount = taskPomoCount;
global.timerOptions = timerOptions;
global.taskButton = taskButton;
global.localStorage = localStorage;
