/**
 * Dropdown options for various backgrounds
 */
export const background = document.getElementById('backgrounds');
const backgroundOneOption = document.getElementById('background_1');
const backgroundTwoOption = document.getElementById('background_2');
const backgroundThreeOption = document.getElementById('background_3');
const backgroundOneURL = "url('./images/background.svg')";
const backgroundTwoURL = "url('./images/background2.svg')";
const backgroundThreeURL = "url('./images/background3.svg')";

// Changes the background image
export function changeBackground () {
  if (this.value === 'original') {
    document.documentElement.style.backgroundImage = backgroundOneURL;
    localStorage.setItem('bg', 'original');
  } else if (this.value === 'desert') {
    document.documentElement.style.backgroundImage = backgroundTwoURL;
    localStorage.setItem('bg', 'desert');
  } else {
    document.documentElement.style.backgroundImage = backgroundThreeURL;
    localStorage.setItem('bg', 'lake');
  }
}

const bg = localStorage.getItem('bg');
switch (bg) {
  case 'original':
    background.value = backgroundOneOption.value;
    break;
  case 'desert':
    background.value = backgroundTwoOption.value;
    break;
  case 'lake':
    background.value = backgroundThreeOption.value;
    break;
  default:
    background.value = backgroundOneOption.value;
    break;
}
