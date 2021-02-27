/**
 * @jest-environment jsdom
 */
require('../../__mocks__/WebAnim.mock');
let { 
  togglePomoBreak, 
  startTimer, 
  resetTimer, 
  updateDistractions,
  beginBreak, 
  currentTime, 
  timerOptions, 
  beginCountdown, 
  timeFraction,
  formatDate, 
  taskComplete, 
  isSameWeek, 
  updateLocalStorage,
  testDom
} = require("./index");

test('checks break toggle', () => {
  expect(togglePomoBreak(true)).toBe(false);
  expect(togglePomoBreak(false)).toBe(true);
});
  
test('checks start state', () => {
  expect(startTimer(false, 0)).toStrictEqual(["pomo", 0]);
  expect(startTimer(true, 0)).toStrictEqual(["short break", 1]);
  expect(startTimer(false, 1)).toStrictEqual(["pomo", 1]);
  expect(startTimer(true, 1)).toStrictEqual(["short break", 2]);
  expect(startTimer(false, 2)).toStrictEqual(["pomo", 2]);
  expect(startTimer(true, 2)).toStrictEqual(["short break", 3]);
  expect(startTimer(false, 3)).toStrictEqual(["pomo",3]);
  expect(startTimer(true, 3)).toStrictEqual(["long break", 0]);
  expect(startTimer(false, 0)).toStrictEqual(["pomo", 0]);
});
  
test('checks reset state', () => {
  expect(resetTimer()).toStrictEqual([timerOptions.STOPPED, "▶ Begin"]);
});

test('checks distraction updates', () => {
  let date = new Date();
  date = formatDate(date);
  expect(updateDistractions(2, "02/14/21")).toStrictEqual(1);
  expect(updateDistractions(2, date)).toStrictEqual(3);
});

test('Check current time display', () => {
  currentTime(1500, document.querySelector('#countdownText'));
  expect(document.querySelector('#countdownText').textContent).toStrictEqual("25:00");

  currentTime(319, document.querySelector('#countdownText'));
  expect(document.querySelector('#countdownText').textContent).toStrictEqual("05:19");

  currentTime(23, document.querySelector('#countdownText'));
  expect(document.querySelector('#countdownText').textContent).toStrictEqual("00:23");
});

test('Test timer fraction', () => {
  expect(timeFraction(150, timerOptions.POMO)).toStrictEqual(0.1);
  expect(timeFraction(1500, timerOptions.POMO)).toStrictEqual(1);
  expect(timeFraction(150, timerOptions.SHORT)).toStrictEqual(0.5);
  expect(timeFraction(60, timerOptions.SHORT)).toStrictEqual(0.2);
  expect(timeFraction(810, timerOptions.LONG)).toStrictEqual(0.9);
  expect(timeFraction(450, timerOptions.LONG)).toStrictEqual(0.5);
});
  
test('checks test', () => {
  testDom();
  expect(document.querySelector("title").innerText).toStrictEqual("Test Text");
});

test('checks format date', () => {
  let check = new Date();
  let dd = String(check.getDate()).padStart(2, "0"); // date
  let mm = String(check.getMonth() + 1).padStart(2, "0"); // month
  let yyyy = check.getFullYear(); // year
  let check_format = mm + "/" + dd + "/" + yyyy;
  
  expect(formatDate(check)).toStrictEqual(check_format);
});

test('checks local storage 0', () => { // test empty storage
  let storage = taskComplete(true, new Date(2021, 1, 18)); // 2-18-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("1");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("1");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks local storage 1', () => { // test different day, different week
  let storage = taskComplete(true, new Date(2021, 1, 10)); // 2-10-2021
  storage = taskComplete(false, new Date(2021, 1, 16)); // 2-16-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("1");
  expect(storage.getItem("today")).toStrictEqual("02/16/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021"); // should update to new week start
});

test('checks local storage 2', () => { // test different day, same week
  let storage = taskComplete(true, new Date(2021, 1, 17)); // 2-17-2021
  storage = taskComplete(false, new Date(2021, 1, 18)); // 2-18-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks local storage 3', () => { // test same day, same week
  let storage = taskComplete(true, new Date(2021, 1, 18)); // 2-18-2021
  storage = taskComplete(false, new Date(2021, 1, 18)); // 2-18-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("2");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks isSameWeek 0', () => { // is same week
  taskComplete(true, new Date(2021, 1, 18));
  expect(isSameWeek(new Date(2021, 1, 21))).toStrictEqual(true);
});

test('checks isSameWeek 1', () => { // is not same week
  taskComplete(true, new Date(2021, 1, 18));
  expect(isSameWeek(new Date(2021, 1, 22))).toStrictEqual(false);
});

test('checks updateLocalStorage', () => {
  let storage = taskComplete(true, new Date(2021, 1, 18));
  updateLocalStorage(2, 2);
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("2");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

describe('statistics', () => {
  test.todo('if open-button opens stats-pane');
  test.todo('if close-button closes stats-pane, after opening');
  test.todo('if open-button opens stats-pane, after closing');
});

describe('Timer Countdown Functions', () =>{
  test.todo('Check beginCountdown() method for work cycles');
  test.todo('Check beginBreak() method for breaks');
});

// test('Checking begin break', () => {
//     beginBreak(300, document.querySelector('#countdownText'));
//     expect(document.querySelector('#countdownText').textContent).toStrictEqual("25:00");
// });

// test('Checking begin countdown', () => {
//     pomoCount = 0;
//     beginCountdown(1500, document.querySelector('#countdownText'));
//     expect(pomoState).toStrictEqual("stopped");
//     expect(document.querySelector('#countdownText').textContent).toStrictEqual("5:00");

//     pomoCount = 3;
//     beginCountdown(1500, document.querySelector('#countdownText'));
//     expect(document.querySelector('#countdownText').textContent).toStrictEqual("15:00");

//     pomoCount = 1;
//     beginCountdown(1500, document.querySelector('#countdownText'));
//     expect(document.querySelector('#countdownText').textContent).toStrictEqual("5:00");
// });