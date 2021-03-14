import { startResetController } from './startResetButton.js';
import * as Constants from './constants.js';
import { openStatsPane, closeStatsPane } from './stats.js';

let keystrokeMode = true;

/**
 * The event listener for whenever keys are pressed
 * Listens only to specific keys and lets other keys perform default action
 * @param {Event} e the fired event object
 */
function keyControls (e) {
  if (e.code === 'ArrowLeft') {
    e.preventDefault();
    openStatsPane();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    closeStatsPane();
  } else if (e.code === 'Space') {
    e.preventDefault();
    startResetController();
  } else if (e.code === 'Enter') {
    e.preventDefault();
    document.getElementById(Constants.TASK_BTN_ID).click();
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
