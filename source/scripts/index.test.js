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

test('checks format date', () => {
  let check = new Date();
  let dd = String(check.getDate()).padStart(2, "0"); // date
  let mm = String(check.getMonth() + 1).padStart(2, "0"); // month
  let yyyy = check.getFullYear(); // year
  check_format = mm + "/" + dd + "/" + yyyy;
  
  expect(format_date(check)).toStrictEqual(check_format);
});

test('checks local storage test 0', () => { // test empty storage
  let check1 = new Date(2021, 1, 18); // 2-18-2021 (month is 0-indexed)
  let check2 = new Date(2021, 1, 18);
  let check3 = new Date(2021, 1, 18);
  storage = updateLocalStorage(true, check1, check2, check3);
  expect(storage.getItem("total-task-count")).toStrictEqual("1");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("1");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks local storage test 1', () => { // test case 1
  let check1 = new Date(2021, 1, 10); // 2-10-2021 (month is 0-indexed)
  let check2 = new Date(2021, 1, 10);
  let check3 = new Date(2021, 1, 10);
  storage = updateLocalStorage(true, check1, check2, check3);
  let check4 = new Date(2021, 1, 16); // 2-16-2021 (month is 0-indexed)
  let check5 = new Date(2021, 1, 16);
  let check6 = new Date(2021, 1, 16);
  storage = updateLocalStorage(false, check4, check5, check6);
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("1");
  expect(storage.getItem("today")).toStrictEqual("02/16/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021"); // should update to new week start
});

test('checks local storage test 2', () => { // test case 2
  let check1 = new Date(2021, 1, 17); // 2-17-2021 (month is 0-indexed)
  let check2 = new Date(2021, 1, 17);
  let check3 = new Date(2021, 1, 17);
  storage = updateLocalStorage(true, check1, check2, check3);
  let check4 = new Date(2021, 1, 18); // 2-18-2021 (month is 0-indexed)
  let check5 = new Date(2021, 1, 18);
  let check6 = new Date(2021, 1, 18);
  storage = updateLocalStorage(false, check4, check5, check6);
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks local storage test 3', () => { // test case 3
  let check1 = new Date(2021, 1, 18); // 2-18-2021 (month is 0-indexed)
  let check2 = new Date(2021, 1, 18);
  let check3 = new Date(2021, 1, 18);
  storage = updateLocalStorage(true, check1, check2, check3);
  let check4 = new Date(2021, 1, 18); // 2-18-2021 (month is 0-indexed)
  let check5 = new Date(2021, 1, 18);
  let check6 = new Date(2021, 1, 18);
  storage = updateLocalStorage(false, check4, check5, check6);
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("2");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

