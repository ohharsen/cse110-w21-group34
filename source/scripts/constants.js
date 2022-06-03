/* Timer Constants */
export const START_STOP_ID = 'start-stop-button';
export const TASK_BTN_ID = 'task';
export const TASK_POMO_COUNTER = 'task-pomo-counter';
export const CENTER_CONTAINER = 'center-container';
export const BREAK_CONTAINER = 'break-container';
export const LENGTH_OF_WEEK = 7;
export const POMO_CYCLE_LENGTH = 4;
export const WORK_LENGTH = 1500; // # of seconds in a work pomo (orig. 1500)
export const SHORT_BREAK = 300; // # of seconds in a short break (orig. 300)
export const LONG_BREAK = 900; // # of seconds in a long break (orig. 900)

/* Settings Pane Class Lists */
// kind of weird that these are only used in settings.js but is defined here.
// many js files have their own list of consts, should think of grouping them all here or come up with consistent rule to distribute them
export const SLIDE_OPEN = 'slide-open';
export const SLIDE_CLOSE = 'slide-close';
export const SLIDE_ACROSS_RIGHT = 'slide-across-right';
export const SLIDE_ACROSS_LEFT = 'slide-across-left';
export const SLIDE_OPEN_SETTINGS = 'slide-open-settings';
export const SLIDE_CLOSE_SETTINGS = 'slide-close-settings';

/* Text */
export const RESET_BTN_TXT = 'Reset';
export const END_BTN_TXT = 'End Session';
export const BEGIN_BTN_TXT = 'Begin';

export const HOST_ADDRESS = 'http://127.0.0.1:5500/';

/**
 * Enumerated keydown event possible controls
 * @enum {string}
 */
export const events = {
  KEYDOWN: 'keydown',
  CLICK: 'click' // cannot find use case might be safe to delete
};

/**
 * Enumerated keydown event possible keys
 * @enum {string}
 */
export const keys = {
  ESCAPE: 'Escape',
  SPACE: 'Space',
  ENTER: 'Enter',
  T: 'KeyT',
  Y: 'KeyY',
  N: 'KeyN',
  LEFT_ARROW: 'ArrowLeft',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown'
};

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
