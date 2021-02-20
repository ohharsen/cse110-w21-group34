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