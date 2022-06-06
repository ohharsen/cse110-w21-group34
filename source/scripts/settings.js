import * as Stats from './stats.js';
import * as Constants from './constants.js';
import { toggleAccessibility, toggleKeystroke, toggleAutoStart, toggleTab } from './accessibility.js';
import { background, changeBackground } from './switchBackground.js';
import { languages, changeLanguage } from './util/language.js';

/* Settings Pane and Buttons */
// might be good to move all these to Constants.js
export const settingsPane = document.getElementById('settings-container');
export const settingsOpenButton = document.getElementById('settings-open-button');
export const settingsCloseButton = document.getElementById('settings-close-button');
export const settingsColorButton = document.getElementById('colors-switch');
export const settingsKeysButton = document.getElementById('keystroke-switch');
export const settingsAutoStartButton = document.getElementById('autostart-switch');
export const settingsTabButton = document.getElementById('tab-switch');

settingsOpenButton.addEventListener('click', openSettingsPane);
settingsCloseButton.addEventListener('click', closeSettingsPane);
settingsColorButton.addEventListener('click', toggleAccessibility);
settingsKeysButton.addEventListener('click', toggleKeystroke);
settingsAutoStartButton.addEventListener('click', toggleAutoStart);
settingsTabButton.addEventListener('click', toggleTab);

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
    Stats.timerBlock.classList.add(Constants.SLIDE_ACROSS_LEFT);
    Stats.breakBlock.classList.remove(Constants.SLIDE_CLOSE);
    Stats.breakBlock.classList.add(Constants.SLIDE_ACROSS_LEFT);
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

  Stats.timerBlock.classList.remove(Constants.SLIDE_ACROSS_LEFT);
  Stats.breakBlock.classList.remove(Constants.SLIDE_ACROSS_LEFT);

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
  settingsTabButton.disabled = !settingsPaneIsOpen;
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

/**
 * Changes the background
 */
background.addEventListener('change', changeBackground);

/**
 * Changes the Language
 */
languages.addEventListener('change', changeLanguage);
/* istanbul ignore next */
/**
 * Shows if Settings pane is open or not
 */
export function settingsPaneStatus () {
  return settingsPaneIsOpen;
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
