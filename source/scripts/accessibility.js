let accessibleMode = false;
const root = document.documentElement;
const ACCESSIBLE_CLASS = 'accessible';
/**
   * Function to toggle the accessibility colors and fonts
   * Darkens backgrounds for better readibility of text
   * Colors picked according to AAA Guidilines
   */
export function toggleAccessibility () {
  if (!accessibleMode) {
    root.classList.add(ACCESSIBLE_CLASS);
  } else {
    root.classList.remove(ACCESSIBLE_CLASS);
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
