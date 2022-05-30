import { keys, TASK_BTN_ID } from './constants.js';
import { startResetController } from './timer.js';
import { openStatsPane, closeStatsPane, statsPaneIsOpen } from './stats.js';
import { openSettingsPane, closeSettingsPane, settingsPaneIsOpen, removeAll } from './settings.js';

/* Button IDs */
const RESET_YES_ID = 'reset-yes-button'; // might be good to move all these to Constants.js
const RESET_NO_ID = 'reset-no-button';

const ACCESSIBLE_CLASS = 'accessible';
const root = document.documentElement;

let accessibleMode = false;
let keystrokeMode = true;
let autostartMode = false;

document.onkeydown = keyControls;

/* All istanbul ignored code is tested in Cypress or uses Canvas */

/**
 * Toggles the accessibility colors and fonts
 *  Darkens backgrounds for better readibility of text
 *  Colors picked according to AAA Guidilines
 */
export function toggleAccessibility () {
  if (!accessibleMode) {
    root.classList.add(ACCESSIBLE_CLASS);
  } else {
    root.classList.remove(ACCESSIBLE_CLASS);
  }
  accessibleMode = !accessibleMode;
}

/**
 * Getter method for accessibleMode
 * @returns {Boolean} true when accessibility mode is on, false if off
 */
export function isA11yEnabled () {
  return accessibleMode;
}

/* istanbul ignore next */
/**
 * Listens to specific key presses and fires an event
 * @param {Event} e - The fired event object
 */
function keyControls (e) {
  switch (e.code) {
    case keys.ESCAPE:
      e.preventDefault();
      (settingsPaneIsOpen) ? closeSettingsPane() : ((statsPaneIsOpen) ? closeStatsPane() : (() => {})());
      break;
    case keys.LEFT_ARROW:
      e.preventDefault();
      removeAll();
      (settingsPaneIsOpen) ? closeSettingsPane() : openStatsPane();
      break;
    case keys.RIGHT_ARROW:
      e.preventDefault();
      removeAll();
      (statsPaneIsOpen) ? closeStatsPane() : openSettingsPane();
      break;
    case keys.SPACE:
      if (!(document.activeElement instanceof HTMLInputElement)) {
        e.preventDefault();
        startResetController();
      }
      break;
    case keys.Y:
      document.getElementById(RESET_YES_ID).click();
      break;
    case keys.N:
      document.getElementById(RESET_NO_ID).click();
      break;
    case keys.T:
    case keys.DOWN_ARROW:
      e.preventDefault();
      document.getElementById(TASK_BTN_ID).click();
      break;
    default:
      break;
  }
}

/**
 * Toggles keystroke access whenever the user toggles the setting switch
 */
export function toggleKeystroke () {
  keystrokeMode = !keystrokeMode;
  document.onkeydown = (keystrokeMode) ? keyControls : undefined;
}

/**
 * Getter method for keystroke mode
 * @returns {Boolean} true when keystroke/shortcuts mode is on, false if off
 */
export function isKeystrokeEnabled () {
  return keystrokeMode;
}

/**
 * Toggles the autostart for the timer whenever the user toggles the setting switch
 */
export function toggleAutoStart () {
  autostartMode = !autostartMode;
}

/**
 * Getter method for auto start mode
 * @returns {Boolean} true when auto start mode is on, false if off
 */
export function isAutoStartEnabled () {
  return autostartMode;
}
