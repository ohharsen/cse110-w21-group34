import * as Stats from './stats.js';
import * as Constants from './constants.js'
import { toggleAccessibility, toggleKeystroke } from './accessibility.js';

/* Settings Pane and Buttons */
export const settingsPane = document.getElementById('settings-container');
export const settingsOpenButton = document.getElementById('settings-open-button');
export const settingsCloseButton = document.getElementById('settings-close-button');
export const settingsColorButton = document.getElementById('colors-switch');
export const settingsKeysButton = document.getElementById('keystroke-switch');

settingsOpenButton.onclick = openSettingsPane;
settingsCloseButton.onclick = closeSettingsPane;
settingsColorButton.onclick = toggleAccessibility;
settingsKeysButton.onclick = toggleKeystroke;

export let settingsPaneIsOpen = false;

/* istanbul ignore next */
/**
 * Opens the settings pane and closes the stats pane
 */
export function openSettingsPane () {
  removeAll();

  if (Stats.statsPane.classList.contains(Constants.SLIDE_OPEN)) {
    Stats.closeStatsPane();

    Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE);
    Stats.timerBlock.classList.add(Constants.SLIDE_ACROSS_RIGHT);
  } else {
    Stats.timerBlock.classList.add(Constants.SLIDE_OPEN_SETTINGS);
  }
  settingsPane.classList.add(Constants.SLIDE_OPEN_SETTINGS);

  settingsPaneIsOpen = true;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Closes the settings pane and allows stats pane to reopen
 */
export function closeSettingsPane () {
  Stats.timerBlock.classList.remove(Constants.SLIDE_OPEN_SETTINGS);
  settingsPane.classList.remove(Constants.SLIDE_OPEN_SETTINGS);

  Stats.timerBlock.classList.remove(Constants.SLIDE_ACROSS_RIGHT);

  Stats.timerBlock.classList.add(Constants.SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.add(Constants.SLIDE_CLOSE_SETTINGS);

  settingsPaneIsOpen = false;
  toggleButtons();
}

/**
 * Toggles the respective settings pane buttons based on the current state
 */
export function toggleButtons () {
  settingsOpenButton.disabled = settingsPaneIsOpen;
  settingsCloseButton.disabled = !settingsPaneIsOpen;
  settingsColorButton.disabled = !settingsPaneIsOpen;
  settingsKeysButton.disabled = !settingsPaneIsOpen;
}

/* istanbul ignore next */
/**
 * Removes existing animation classes from stats and settings panes
 */
export function removeAll () {
  Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE);
  Stats.statsPane.classList.remove(Constants.SLIDE_CLOSE);

  Stats.timerBlock.classList.remove(Constants.SLIDE_CLOSE_SETTINGS);
  settingsPane.classList.remove(Constants.SLIDE_CLOSE_SETTINGS);
}
