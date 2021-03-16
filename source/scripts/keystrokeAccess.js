import { startResetController } from './startResetButton.js';
import * as Constants from './constants.js';
import {
  openStatsPane,
  closeStatsPane,
  isOpenStatsPane
} from './stats.js';

import {
  openSettingsPane,
  closeSettingsPane,
  isOpenSettingsPane,
  removeAll
} from './settings.js';

let keystrokeMode = true;

/**
 * The event listener for whenever keys are pressed
 * Listens only to specific keys and lets other keys perform default action
 * @param {Event} e the fired event object
 */
function keyControls (e) {
  switch (e.code) {
    case 'Escape':
      e.preventDefault();
      isOpenSettingsPane ? closeSettingsPane() : isOpenStatsPane ? closeStatsPane() : (() => {})();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      removeAll();
      isOpenSettingsPane ? closeSettingsPane() : openStatsPane();
      break;
    case 'ArrowRight':
      e.preventDefault();
      removeAll();
      isOpenStatsPane ? closeStatsPane() : openSettingsPane();
      break;
    case 'Space':
      e.preventDefault();
      startResetController();
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

document.onkeydown = keyControls;

/**
 * Function to toggle keystroke access. Called whenever the user toggles the setting switch
 */
function toggleKeystroke () {
  keystrokeMode = !keystrokeMode;
  document.onkeydown = keystrokeMode ? keyControls : undefined;
}

document.getElementById('keystroke-switch').onclick = toggleKeystroke;
