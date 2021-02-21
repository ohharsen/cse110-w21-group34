/**
 * @jest-environment jsdom
 */
require('../../__mocks__/WebAnim.mock');
let { 
  togglePomoBreak, 
  startTimer, 
  resetTimer, 
  beginBreak, 
  currentTime, 
  timerOptions, 
  beginCountdown, 
  timeFraction,
  testDom 
} = require("./index");

test('checks break toggle', () => {
  expect(togglePomoBreak(true)).toBe(false);
  expect(togglePomoBreak(false)).toBe(true);
});
  
test('checks start state', () => {
  
  let listOfCalls = [];
  for(let i = 0; i < 6; ++i){
    listOfCalls.push(startTimer());
  }
  // expect(startTimer()).toStrictEqual(["short break", 1,"✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["pomo", 1, "✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["short break", 2,"✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["pomo", 2, "✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["short break", 3,"✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["pomo",3, "✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["long break", 0,"✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["pomo", 0, "✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["short break", 1, "✖ Reset"]);
  expect(listOfCalls[0]).toStrictEqual(["pomo", 0, "✖ Reset"]);
  expect(listOfCalls[1]).toStrictEqual(["short break", 1,"✖ Reset"]);
  expect(listOfCalls[2]).toStrictEqual(["pomo", 1, "✖ Reset"]);
  expect(listOfCalls[3]).toStrictEqual(["short break", 2,"✖ Reset"]);
  expect(listOfCalls[4]).toStrictEqual(["pomo", 2, "✖ Reset"]);
  expect(listOfCalls[5]).toStrictEqual(["short break", 3,"✖ Reset"]);

  // resetTimer();
  // expect(startTimer()).toStrictEqual(["pomo", 0, "✖ Reset"]);
  // expect(startTimer()).toStrictEqual(["short break", 1, "✖ Reset"]);
});
  
test('checks reset state', () => {
  expect(resetTimer()).toStrictEqual(["stopped", 0, "▶ Begin"]);
});

test('Check current time display', ()=>{
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