let accessibleMode = false;
const root = document.documentElement;
/**
   * Function to toggle the accessibility colors and fonts
   * Darkens backgrounds for better readibility of text
   * Colors picked according to AAA Guidilines
   */
function toggleAccessibility () {
  if (!accessibleMode) {
    // Colors
    root.style.setProperty('--green', '#006646');
    root.style.setProperty('--red', '#B50014');
    root.style.setProperty('--orange', '#AA2500');
    root.style.setProperty('--orangered-grad', 'linear-gradient(180deg, #B40000 0%, #AC2100 100%)');
    root.style.setProperty('--orange-light-grad', 'linear-gradient(180deg, #b4000036 0%, #ac2100 100%), conic-gradient(from 1.14deg at 42.54% 1226.03%, #416200 -22.72deg, #1915d9e2 160.22deg, #41620000 163.43deg, #416200 337.28deg, #1915d9e2 520.22deg)');
    root.style.setProperty('--orange-dark-grad', 'linear-gradient(180deg, #AA2500 0%, #575757 100%)');
    root.style.setProperty('--orange-dark-grad-1', 'linear-gradient(180deg, #575757 0%, #AA2500 100%)');
    root.style.setProperty('--green-grad', 'linear-gradient(180deg,  #575757 0%, #00644e 100%)');
    root.style.setProperty('--green-grad-1', 'linear-gradient(180deg,  #00644e 0%, #575757 100%)');
    root.style.setProperty('--white-a1', 'rgba(255, 255, 255, 0.9)');
    root.style.setProperty('--counter-color', 'black');

    // Texts
    root.style.setProperty('font-size', '1.1em');
    root.style.setProperty('--button-text-size', '22px');
    root.style.setProperty('font-weight', 'bolder');

    // Background
    root.style.setProperty('--bacgkround-source', 'url("../images/background_hi_contrast.png")');
  } else {
    // Colors
    root.style = '';
  }
  accessibleMode = !accessibleMode;
}

/** redundant, used for linting */
toggleAccessibility();
toggleAccessibility();
// document.getElementById('toggle-accessibility').onclick = toggleAccessibility;
