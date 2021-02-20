/**
 * @jest-environment jsdom
 */

let { togglePomoBreak, startTimer, resetTimer, testDom } = require("./index");

test('checks break toggle', () => {
  expect(togglePomoBreak(true)).toBe(false);
  expect(togglePomoBreak(false)).toBe(true);
});
  
test('checks start state', () => {
  expect(startTimer()).toStrictEqual(["pomo","✖ Reset"]);
});
  
test('checks reset state', () => {
  expect(resetTimer()).toStrictEqual(["stopped","▶ Begin"]);
});
  
test('checks test', () => {
  testDom();
  expect(document.querySelector("title").innerText).toStrictEqual("Test Text");
});

describe('statistics', () => {
  const openStyle = 'left: calc(100vw - 25vw - 32px);';
  const closedStyle = 'left: 100vw;';

  test('if open-button opens stats-pane', () => {
    const statsPane = document.getElementById('stats-container');
    const openButton = document.getElementById('stats-open-button');

    openButton.click();
    expect(statsPane.getAttribute('style')).toBe(openStyle);
  });
  
  test('if close-button closes stats-pane, after opening', () => {
    const statsPane = document.getElementById('stats-container');
    const closeButton = document.getElementById('stats-close-button');
    
    closeButton.click();
    expect(statsPane.getAttribute('style')).toBe(closedStyle);
  });

  test('if open-button opens stats-pane, after closing', () => {
    const statsPane = document.getElementById('stats-container');
    const openButton = document.getElementById('stats-open-button');
    
    openButton.click();
    expect(statsPane.getAttribute('style')).toBe(openStyle);
  });
});