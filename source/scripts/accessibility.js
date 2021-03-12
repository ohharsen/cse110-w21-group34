let accessibleMode = false;
const root = document.documentElement;

/**
   * Function to toggle the accessibility colors and fonts
   * Darkens backgrounds for better readibility of text
   * Colors picked according to AAA Guidilines
   */
function toggleAccessibility () {
  if (!accessibleMode) {
    root.classList.add('accessible');
  } else {
    root.classList.remove('accessible');
  }
  accessibleMode = !accessibleMode;
}

/**
 * Getter function to retrieve accessibleMode variable,
 * which indicates whether accessibility mode is on
 * @return {boolean} true when accessibility mode is on, false if off
 */
export function isA11yEnabled () {
  return accessibleMode;
}

/** redundant, used for linting */
toggleAccessibility();
toggleAccessibility();
// document.getElementById('toggle-accessibility').onclick = toggleAccessibility;
