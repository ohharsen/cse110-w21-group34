const backgroundOneURL = "url('./images/background.svg')";
const backgroundTwoURL = "url('./images/background2.svg')";
const backgroundThreeURL = "url('./images/background3.svg')";

const bg = localStorage.getItem('bg');

switch (bg) {
  case 'original':
    document.documentElement.style.backgroundImage = backgroundOneURL;
    break;
  case 'desert':
    document.documentElement.style.backgroundImage = backgroundTwoURL;
    break;
  case 'lake':
    document.documentElement.style.backgroundImage = backgroundThreeURL;
    break;
  default:
    document.documentElement.style.backgroundImage = backgroundOneURL;
    break;
}
