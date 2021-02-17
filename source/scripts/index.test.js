/**
 * @jest-environment jsdom
 */

let { togglePomoBreak, startTimer, resetTimer, displayTaskComplete, updateLocalStorage } = require("./index");

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

test('checks task display text', () => {
  expect(displayTaskComplete()).toStrictEqual("You've Completed a Task!!!");
});

test('checks task date text', () => {
  // date information
  let check = new Date();
  let dd = String(check.getDate()).padStart(2, "0"); // date
  let mm = String(check.getMonth() + 1).padStart(2, "0"); // month
  let yyyy = check.getFullYear(); // year
  check = mm + "/" + dd + "/" + yyyy;
  
  expect(updateLocalStorage()).toStrictEqual(check);
});

