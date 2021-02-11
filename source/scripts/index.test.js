/**
 * @jest-environment jsdom
 */

let { togglePomoBreak, startTimer, resetTimer } = require("./index");

test('checks break toggle', () => {
  window.onload = function() {
    expect(togglePomoBreak(true)).toBe(false);
    expect(togglePomoBreak(false)).toBe(true);
  }
});
  
test('checks start state', () => {
  window.onload = function() {
    expect(startTimer().toBe(["pomo","✖ Reset"]));
  }
});
  
test('checks reset state', () => {
  window.onload = function() {
    expect(resetTimer().toBe(["stopped","▶ Begin"]));
  }
});

