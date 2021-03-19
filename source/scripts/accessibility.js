import * as Constants from './constants.js';
import { startResetController } from './timer.js';
import { openStatsPane, closeStatsPane, isOpenStatsPane } from './stats.js';
import { openSettingsPane, closeSettingsPane, isOpenSettingsPane, removeAll } from './settings.js';

/* Keystroke Constants */
const ESCAPE = 'Escape';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const SPACE = 'Space';
const KEY_Y = 'KeyY';
const KEY_N = 'KeyN';
const KEY_T = 'KeyT';
const ARROW_DOWN = 'ArrowDown';

/* Button IDs */
const RESET_YES_ID = 'reset-yes-button';
const RESET_NO_ID = 'reset-no-button';

const ACCESSIBLE_CLASS = 'accessible';
const root = document.documentElement;

let accessibleMode = false;
let keystrokeMode = true;

document.onkeydown = keyControls;

/* All instanbul ignored code is tested in Cypress or uses Canvas */

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
 * @return {boolean} true when accessibility mode is on, false if off
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
    case ESCAPE:
      e.preventDefault();
      (isOpenSettingsPane) ? closeSettingsPane() : ((isOpenStatsPane) ? closeStatsPane() : (() => {})());
      break;
    case ARROW_LEFT:
      e.preventDefault();
      removeAll();
      (isOpenSettingsPane) ? closeSettingsPane() : openStatsPane();
      break;
    case ARROW_RIGHT:
      e.preventDefault();
      removeAll();
      (isOpenStatsPane) ? closeStatsPane() : openSettingsPane();
      break;
    case SPACE:
      if (!(document.activeElement instanceof HTMLInputElement)) {
        e.preventDefault();
        startResetController();
      }
      break;
    case KEY_Y:
      document.getElementById(RESET_YES_ID).click();
      break;
    case KEY_N:
      document.getElementById(RESET_NO_ID).click();
      break;
    case KEY_T:
    case ARROW_DOWN:
      e.preventDefault();
      document.getElementById(Constants.TASK_BTN_ID).click();
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
 * @return {boolean} true when keystroke/shortcuts mode is on, false if off
 */
export function isKeystrokeEnabled () {
  return keystrokeMode;
}
