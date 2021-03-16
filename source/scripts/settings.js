import * as Stats from './stats.js';
import { toggleAccessibility, toggleKeystroke } from './accessibility.js';

export const settingsPane = document.getElementById('settings-container');
export const settingsOpenButton = document.getElementById('settings-open-button');
export const settingsCloseButton = document.getElementById('settings-close-button');
export const settingsColorButton = document.getElementById('colors-switch');
export const settingsKeysButton = document.getElementById('keystroke-switch');

settingsOpenButton.onclick = openSettingsPane;
settingsCloseButton.onclick = closeSettingsPane;
settingsColorButton.onclick = toggleAccessibility;
settingsKeysButton.onclick = toggleKeystroke;

export let isOpenSettingsPane = false;

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
export function openSettingsPane () {
  removeAll();

  if (Stats.statsPane.classList.contains('slide-open')) {
    Stats.closeStatsPane();

    Stats.timerBlock.classList.remove('slide-close');
    Stats.timerBlock.classList.add('slide-across-right');
  } else {
    Stats.timerBlock.classList.add('slide-open-settings');
  }
  settingsPane.classList.add('slide-open-settings');

  isOpenSettingsPane = true;
  toggleButtons();
}

/* istanbul ignore next */
/**
 * Opens the statistics pane.
 */
export function closeSettingsPane () {
  Stats.timerBlock.classList.remove('slide-open-settings');
  settingsPane.classList.remove('slide-open-settings');

  Stats.timerBlock.classList.remove('slide-across-right');

  Stats.timerBlock.classList.add('slide-close-settings');
  settingsPane.classList.add('slide-close-settings');

  isOpenSettingsPane = false;
  toggleButtons();
}

/**
 * Enables / Disables the respective settings pane buttons based on the current
 * state.
 */
export function toggleButtons () {
  settingsOpenButton.disabled = isOpenSettingsPane;
  settingsCloseButton.disabled = !isOpenSettingsPane;
  settingsColorButton.disabled = !isOpenSettingsPane;
  settingsKeysButton.disabled = !isOpenSettingsPane;
}

export function removeAll () {
  Stats.timerBlock.classList.remove('slide-close');
  Stats.statsPane.classList.remove('slide-close');

  Stats.timerBlock.classList.remove('slide-close-settings');
  settingsPane.classList.remove('slide-close-settings');
}
