import * as Constants from './constants.js';
import { startResetController } from './timer.js';
import { openStatsPane, closeStatsPane, isOpenStatsPane } from './stats.js';
import { openSettingsPane, closeSettingsPane, isOpenSettingsPane, removeAll } from './settings.js';

const ACCESSIBLE_CLASS = 'accessible';
const root = document.documentElement;

let accessibleMode = false;
let keystrokeMode = true;

document.onkeydown = keyControls;

/**
   * Function to toggle the accessibility colors and fonts
   * Darkens backgrounds for better readibility of text
   * Colors picked according to AAA Guidilines
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
 * Getter function to retrieve accessibleMode variable,
 * which indicates whether accessibility mode is on
 * @return {boolean} true when accessibility mode is on, false if off
 */
export function isA11yEnabled () {
  return accessibleMode;
}

/* istanbul ignore next */
/**
 * The event listener for whenever keys are pressed
 * Listens only to specific keys and lets other keys perform default action
 * @param {Event} e the fired event object
 */
function keyControls (e) {
  switch (e.code) {
    case 'Escape':
      e.preventDefault();
      (isOpenSettingsPane) ? closeSettingsPane() : ((isOpenStatsPane) ? closeStatsPane() : (() => {})());
      break;
    case 'ArrowLeft':
      e.preventDefault();
      removeAll();
      (isOpenSettingsPane) ? closeSettingsPane() : openStatsPane();
      break;
    case 'ArrowRight':
      e.preventDefault();
      removeAll();
      (isOpenStatsPane) ? closeStatsPane() : openSettingsPane();
      break;
    case 'Space':
      if (!(document.activeElement instanceof HTMLInputElement)) {
        e.preventDefault();
        startResetController();
      }
      break;
    case 'KeyY':
      document.getElementById('reset-yes-button').click();
      break;
    case 'KeyN':
      document.getElementById('reset-no-button').click();
      break;
    case 'KeyT':
    case 'ArrowDown':
      e.preventDefault();
      document.getElementById(Constants.TASK_BTN_ID).click();
      break;
    default:
      break;
  }
}

/**
 * Function to toggle keystroke access. Called whenever the user toggles the setting switch
 */
export function toggleKeystroke () {
  keystrokeMode = !keystrokeMode;
  document.onkeydown = (keystrokeMode) ? keyControls : undefined;
}

/**
 * Getter function to retrieve the keystroke mode,
 * which indicates whether keyboard shortcuts is on
 * @return {boolean} true when keystroke/shortcuts mode is on, false if off
 */
export function isKeystrokeEnabled () {
  return keystrokeMode;
}
