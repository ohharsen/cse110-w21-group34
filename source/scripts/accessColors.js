  let accessibleMode = false;
  const root = document.documentElement;
  /**
   * Function to toggle the accessibility colors and fonts
   * Darkens backgrounds for better readibility of text
   * Colors picked according to AAA Guidilines
   */
  function toggleAccessibility () {
    if (!accessibleMode) {
      root.style.setProperty('--green', '#006646');
      root.style.setProperty('--red', '#B50014');
      root.style.setProperty('--orange', '#AA2500');
      root.style.setProperty('--orangered-grad', 'linear-gradient(180deg, #B40000 0%, #AC2100 100%)');
      root.style.setProperty('--orange-light-grad', 'linear-gradient(180deg, #b4000036 0%, #ac2100 100%), conic-gradient(from 1.14deg at 42.54% 1226.03%, #416200 -22.72deg, #1915d9e2 160.22deg, #41620000 163.43deg, #416200 337.28deg, #1915d9e2 520.22deg)');
      root.style.setProperty('--orange-dark-grad', 'linear-gradient(180deg, #AA2500 0%, #575757 100%)');
      root.style.setProperty('--orange-dark-grad-1', 'linear-gradient(180deg, #575757 0%, #AA2500 100%)');
      root.style.setProperty('--green-grad', 'linear-gradient(180deg,  #575757 0%, #00644e 100%)');
      root.style.setProperty('--green-grad-1', 'linear-gradient(180deg,  #00644e 0%, #57575700 100%)');
      root.style.setProperty('--white-a1', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--button-text-size', '22px');
      root.style.setProperty('font-size', '1.1em');
    } else {
      root.style.setProperty('--green', '#34DBB3');
      root.style.setProperty('--red', '#DB2E2E');
      root.style.setProperty('--orange', '#E95D31');
      root.style.setProperty('--orangered-grad', 'linear-gradient(180deg, rgba(255, 0, 0, 0.78) 0%, #E8582B 100%)');
      root.style.setProperty('--orange-light-grad', 'linear-gradient(180deg, #ff000036 0%, #E8582B 100%), conic-gradient(from 1.14deg at 42.54% 1226.03%, #BDD915 -22.72deg, #1915d9e2 160.22deg, #bdd91500 163.43deg, #BDD915 337.28deg, #1915d9e2 520.22deg)');
      root.style.setProperty('--orange-dark-grad', 'linear-gradient(180deg, #E95D31 0%, rgba(255, 255, 255, 0) 100%)');
      root.style.setProperty('--orange-dark-grad-1', 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #E95D31 100%)');
      root.style.setProperty('--green-grad', 'linear-gradient(180deg,  #ffffff00 0%, #0D927A 100%)');
      root.style.setProperty('--green-grad-1', 'linear-gradient(180deg, #0D927A 0%, rgba(255, 255, 255, 0) 100%)');
      root.style.setProperty('--white-a1', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--button-text-size', '18px');
      root.style.setProperty('font-size', '1em');
    }
    accessibleMode = !accessibleMode;
  }

  /** redundant, used for linting */
  toggleAccessibility();
  toggleAccessibility()