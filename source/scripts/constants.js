/* Constants */
export const START_STOP_ID = 'start-stop-button';
export const RESET_BTN_TXT = '✖ Reset';
export const BEGIN_BTN_TXT = '▶ Begin';
export const TASK_BTN_ID = 'task';
export const BEST_DAILY_POMO_ID = 'best-daily-pomo-count';
export const TOTAL_POMO_ID = 'total-pomo-count';
export const TOTAL_TASK_ID = 'total-task-count';
export const TODAY_TASK_ID = 'today-task-count';
export const WEEK_TASK_ID = 'week-task-count';
export const WEEK_HISTORY = 'week-history';
export const TODAY_DATE_ID = 'today';
export const WEEK_START_ID = 'week-start';
export const TODAY_POMO_ID = 'today-pomo-count';
export const TOTAL_CYCLE_ID = 'total-cycle-count';
export const TOTAL_DISTRACTION = 'total-distraction';
export const TODAY_DISTRACTION = 'today-distraction';
export const TASK_POMO_COUNTER = 'task-pomo-counter';
export const CENTER_CONTAINER = 'center-container';
export const LENGTH_OF_WEEK = 7;
export const WORK_LENGTH = 1500; // # of seconds in a work pomo (orig. 1500)
export const SHORT_BREAK = 300; // # of seconds in a short break (orig. 300)
export const LONG_BREAK = 900; // # of seconds in a long break (orig. 900)

export const HOST_ADDRESS = 'http://127.0.0.1:5500/';


/**
 * Enumerated keydown event possible keys
 * @enum {string}
 */
export const events = {
  KEYDOWN: 'keydown',
  CLICK: 'click'
};

/**
 * Enumerated keydown event possible keys
 * @enum {string}
 */
export const keys = { 
 SPACE: 'Space',
 ENTER: 'Enter',
 LEFT_ARROW: 'ArrowLeft',
 RIGHT_ARROW: 'ArrowRight',
}

/**
 * Enumerated timer states
 * @enum {string}
 */
export const timerOptions = {
  STOPPED: 'stopped',
  POMO: 'pomo',
  SHORT: 'short break',
  LONG: 'long break'
};
