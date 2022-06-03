/* Dropdown options for various backgrounds
const backgroundOneOption = document.getElementById('background_1');
const backgroundTwoOption = document.getElementById('background_2');
const backgroundThreeOption = document.getElementById('background_3');

const backgroundOneURL = "url('./images/background.svg')";
const backgroundTwoURL = "url('./images/background2.png')";
const backgroundThreeURL = "url('./images/background3.png')";

const backgroundDropDown = document.getElementById('backgroundDropDown');

backgroundOneOption.onclick = backgroundOneClicked;
backgroundTwoOption.onclick = backgroundTwoClicked;
backgroundThreeOption.onclick = backgroundThreeClicked;

backgroundDropDown.onmouseover = enableDropdown;

function disableDropdown () {
  document.getElementById('backgrounds').style.display = 'none';
}

function enableDropdown () {
  document.getElementById('backgrounds').style.display = '';
}

function backgroundOneClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundOneURL;
}

function backgroundTwoClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundTwoURL;
}

function backgroundThreeClicked () {
  disableDropdown();
  document.documentElement.style.backgroundImage = backgroundThreeURL;
} */
