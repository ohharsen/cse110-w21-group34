import { startResetController } from './startResetButton.js';
import * as Constants from './constants.js';
import { openStatsPane, closeStatsPane } from './stats.js';

document.onkeydown = function (e) {
  switch (e.code) {
    case 'Escape':
      e.preventDefault();
      closeStatsPane();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      openStatsPane();
      break;
    case 'ArrowRight':
      e.preventDefault();
      closeStatsPane();
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
