import { startResetController } from './startResetButton.js';
import * as Constants from './constants.js';
import {
  openStatsPane,
  closeStatsPane,
  openPane,
  openSettingsPane,
  closeSettingsPane,
  removeAll
} from './stats.js';

document.onkeydown = function (e) {
  switch (e.code) {
    case 'Escape':
      e.preventDefault();
      openPane === 'settings' ? closeSettingsPane() : openPane === 'stats' ? closeStatsPane() : (() => {})();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      removeAll();
      openPane === 'settings' ? closeSettingsPane() : openStatsPane();
      break;
    case 'ArrowRight':
      e.preventDefault();
      removeAll();
      openPane === 'stats' ? closeStatsPane() : openSettingsPane();
      break;
    case 'Space':
      e.preventDefault();
      startResetController();
      break;
    case 'KeyT':
    case 'ArrowDown':
      e.preventDefault();
      document.getElementById(Constants.TASK_BTN_ID).click();
      break;
    default:
      break;
  }
};
