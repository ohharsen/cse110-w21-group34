/**
 * Dropdown options for various backgrounds
 */
export const background = document.getElementById('backgrounds');
const backgroundOneOption = document.getElementById('background_1');
const backgroundTwoOption = document.getElementById('background_2');
const backgroundThreeOption = document.getElementById('background_3');
const backgroundOneURL = "url('./images/background.svg')";
const backgroundTwoURL = "url('./images/background2.png')";
const backgroundThreeURL = "url('./images/background3.png')";

// Changes the background image
export function changeBackground () {
  if (this.value == 'original') {
    document.documentElement.style.backgroundImage = backgroundOneURL;
  } else if (this.value == 'desert') {
    document.documentElement.style.backgroundImage = backgroundTwoURL;
  } else {
    document.documentElement.style.backgroundImage = backgroundThreeURL;
  }
}

/* let bg = localStorage.getItem("bg");
switch (bg) {
  case "original":
    document.documentElement.style.backgroundImage = backgroundOneURL;
    background.value = backgroundOneOption.value;
    break;
  case "desert":
    document.documentElement.style.backgroundImage = backgroundTwoURL;
    background.value = backgroundTwoOption.value;
    break;
  case "lake":
    document.documentElement.style.backgroundImage = backgroundThreeURL;
    background.value = backgroundThreeOption.value;
    break;
  default:
    break;
} */
