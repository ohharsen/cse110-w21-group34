import * as Stats from './stats.js';
import * as Constants from './constants.js';
import { toggleAccessibility, toggleKeystroke, toggleAutoStart } from './accessibility.js';

/* Settings Pane and Buttons */
// might be good to move all these to Constants.js
export const settingsPane = document.getElementById('settings-container');
export const settingsOpenButton = document.getElementById('settings-open-button');
export const settingsCloseButton = document.getElementById('settings-close-button');
export const settingsColorButton = document.getElementById('colors-switch');
export const settingsKeysButton = document.getElementById('keystroke-switch');
export const settingsAutoStartButton = document.getElementById('autostart-switch');

settingsOpenButton.onclick = openSettingsPane;
settingsCloseButton.onclick = closeSettingsPane;
settingsColorButton.onclick = toggleAccessibility;
settingsKeysButton.onclick = toggleKeystroke;
settingsAutoStartButton.onclick = toggleAutoStart;

export let settingsPaneIsOpen = false;

/* istanbul ignore next */
/**
 * Opens the settings pane and closes the stats pane
 */
export function openSettingsPane () {
  removeAll();
  // closing the status pane and open the settings
  if (Stats.statsPane.classList.contains(Constants.SLIDE_OPEN)) {
    Stats.closeStatsPane();
    Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE);
    Stats.timerBlock.classList.add(Constants.SLIDE_ACROSS_RIGHT);
    Stats.breakBlock.classList.remove(Constants.SLIDE_CLOSE);
    Stats.breakBlock.classList.add(Constants.SLIDE_ACROSS_RIGHT);
  } else { // add the slide open settings (css)
    Stats.timerBlock.classList.add(Constants.SLIDE_OPEN_SETTINGS);
    Stats.breakBlock.classList.add(Constants.SLIDE_OPEN_SETTINGS);
  }
  settingsPane.classList.add(Constants.SLIDE_OPEN_SETTINGS);

  settingsPaneIsOpen = true;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Closes the settings pane and allows stats pane to reopen
 * removes unnecessary css animations
 */
export function closeSettingsPane () {
  Stats.timerBlock.classList.remove(Constants.SLIDE_OPEN_SETTINGS);
  Stats.breakBlock.classList.remove(Constants.SLIDE_OPEN_SETTINGS);
  settingsPane.classList.remove(Constants.SLIDE_OPEN_SETTINGS);

  Stats.timerBlock.classList.remove(Constants.SLIDE_ACROSS_RIGHT);
  Stats.breakBlock.classList.remove(Constants.SLIDE_ACROSS_RIGHT);

  Stats.timerBlock.classList.add(Constants.SLIDE_CLOSE_SETTINGS);
  Stats.breakBlock.classList.add(Constants.SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.add(Constants.SLIDE_CLOSE_SETTINGS);

  settingsPaneIsOpen = false;
  toggleButtons();
}

/* instanbul ignore next */
/**
 * Toggles the respective settings pane buttons based on the current state
 */
export function toggleButtons () {
  settingsOpenButton.disabled = settingsPaneIsOpen;
  settingsCloseButton.disabled = !settingsPaneIsOpen;
  settingsColorButton.disabled = !settingsPaneIsOpen;
  settingsKeysButton.disabled = !settingsPaneIsOpen;
  settingsAutoStartButton.disabled = !settingsPaneIsOpen;
}

/* istanbul ignore next */
/**
 * Removes existing animation classes from stats and settings panes
 */
export function removeAll () {
  Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE);
  Stats.breakBlock.classList.remove(Constants.SLIDE_CLOSE);
  Stats.statsPane.classList.remove(Constants.SLIDE_CLOSE);

  Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE_SETTINGS);
  Stats.breakBlock.classList.remove(Constants.SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.remove(Constants.SLIDE_CLOSE_SETTINGS);
}
/*
* initial load
* sets height of settings/stats tab
*/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

/* istanbul ignore next */
/**
 * on window resize trigger new height
 */
window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
