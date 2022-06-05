import { keys, TASK_BTN_ID } from './constants.js';
import { startResetController, settingsButton, statsButton } from './timer.js';
import { openStatsPane, closeStatsPane, statsPaneIsOpen } from './stats.js';
import { openSettingsPane, closeSettingsPane, settingsPaneIsOpen, removeAll } from './settings.js';

/* Button IDs */
const RESET_YES_ID = 'reset-yes-button'; // might be good to move all these to Constants.js
const RESET_NO_ID = 'reset-no-button';

const ACCESSIBLE_CLASS = 'accessible';
const root = document.documentElement;

document.onkeydown = keyControls;
// set default settings
let accessibleMode = false;
let keystrokeMode = true;
let autostartMode = false;
let tabMode = true;
document.onkeydown = keyControls;
// override defaults if we have previous saved settings
if (localStorage.getItem('accessible') === 'true') {
  toggleAccessibility();
  document.getElementById('colors-switch').checked = true;
} else {
  document.getElementById('colors-switch').checked = false;
}
if (localStorage.getItem('keystroke') === 'false') {
  toggleKeystroke();
  document.getElementById('keystroke-switch').checked = false;
} else {
  document.getElementById('keystroke-switch').checked = true;
}
if (localStorage.getItem('auto') === 'true') {
  toggleAutoStart();
  document.getElementById('autostart-switch').checked = true;
} else {
  document.getElementById('autostart-switch').checked = false;
}
if (localStorage.getItem('tab') === 'false') {
  toggleTab();
  document.getElementById('tab-switch').checked = false;
} else {
  document.getElementById('tab-switch').checked = true;
}

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
  accessibleMode ? localStorage.setItem('accessible', 'true') : localStorage.setItem('accessible', 'false');
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
    case keys.RIGHT_ARROW:
      if (!statsButton.disabled) {
        e.preventDefault();
        removeAll();
        (settingsPaneIsOpen) ? closeSettingsPane() : openStatsPane();
      }
      break;
    case keys.LEFT_ARROW:
      if (!settingsButton.disabled) {
        e.preventDefault();
        removeAll();
        (statsPaneIsOpen) ? closeStatsPane() : openSettingsPane();
      }
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
  keystrokeMode ? localStorage.setItem('keystroke', 'true') : localStorage.setItem('keystroke', 'false');
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
  autostartMode ? localStorage.setItem('auto', 'true') : localStorage.setItem('auto', 'false');
}

/**
 * Getter method for auto start mode
 * @returns {Boolean} true when auto start mode is on, false if off
 */
export function isAutoStartEnabled () {
  return autostartMode;
}

/**
 * Toggles the tab timer view for the timer whenever the user toggles the setting switch
 */
export function toggleTab () {
  tabMode = !tabMode;
  tabMode ? localStorage.setItem('tab', 'true') : localStorage.setItem('tab', 'false');
  if (!tabMode) {
    window.document.title = 'Pomodoro by Texas Codem';
  }
}

/**
 * Getter method for tab mode (controls whats visible as title of tab)
 * @returns {Boolean} true when auto start mode is on, false if off
 */
export function isTabEnabled () {
  return tabMode;
}
