/**
 * @jest-environment jsdom
 */

let { togglePomoBreak, startTimer, resetTimer } = require("./index");

test('checks break toggle', () => {
  expect(togglePomoBreak(true)).toBe(false);
  expect(togglePomoBreak(false)).toBe(true);
});

test('checks start state', () => {
  expect(startTimer().toBe(["pomo","✖ Reset"]));
});

test('checks reset state', () => {
  expect(resetTimer().toBe(["stopped","▶ Begin"]));
});