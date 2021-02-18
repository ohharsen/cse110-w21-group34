/**
 * @jest-environment jsdom
 */

let { togglePomoBreak, startTimer, resetTimer } = require("./index");

test('checks break toggle', () => {
  expect(togglePomoBreak(true)).toBe(false);
  expect(togglePomoBreak(false)).toBe(true);
});
  
test('checks start state', () => {
  expect(startTimer()).toStrictEqual(["pomo","✖ Reset"]);
});
  
test('checks reset state', () => {
  expect(resetTimer()).toStrictEqual(["stopped", 0, "▶ Begin"]);
});

test('Check current time display', ()=>{
  expect(currentTime(1500, document.querySelector('#countdownText'))).toStrictEqual("25:00");
  expect(currentTime(319, document.querySelector('#countdownText'))).toStrictEqual("05:19");
  expect(currentTime(23, document.querySelector('#countdownText'))).toStrictEqual("00:23");
});

