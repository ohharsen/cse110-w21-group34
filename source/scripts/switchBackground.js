// Dropdown options for various backgrounds
const backgroundOneOption = document.getElementById('background_1');
const backgroundTwoOption = document.getElementById('background_2');
const backgroundThreeOption = document.getElementById('background_3');

const backgroundOneURL = "url('../images/background.png')";
const backgroundTwoURL = "url('../images/background2.png')";
const backgroundThreeURL = "url('../images/background3.png')";

const backgroundDropDown = document.getElementById('backgroundDropDown');

backgroundOneOption.onclick = backgroundOneClicked;
backgroundTwoOption.onclick = backgroundTwoClicked;
backgroundThreeOption.onclick = backgroundThreeClicked;

backgroundDropDown.onmouseover = enableDropdown;

/* istanbul ignore next */
/**
 * Disables the background dropdown options from being displayed
 */
function disableDropdown () {
  document.getElementById('backgrounds').style.display = 'none';
}

/* istanbul ignore next */
/**
 * Enables the background dropdown options to be displayed
 */
function enableDropdown () {
  document.getElementById('backgrounds').style.display = '';
}

/* istanbul ignore next */
/**
 * Triggered when background 1 is selected
 * Changes background to background 1 then disables dropdown options
 */
function backgroundOneClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundOneURL;
}

/* istanbul ignore next */
/**
 * Triggered when background 2 is selected
 * Changes background to background 2 then disables dropdown options
 */
function backgroundTwoClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundTwoURL;
}

/* istanbul ignore next */
/**
 * Triggered when background 3 is selected
 * Changes background to background 3 then disables dropdown options
 */
function backgroundThreeClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundThreeURL;
}
