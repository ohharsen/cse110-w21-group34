/**
 * @jest-environment jsdom
 */

const fs = require('fs')

fs.readFile('../index.html', 'utf8' , (err, data) => {
  if (err) {
    return
  }
  document.body.innerHTML = data;
})

let { togglePomoBreak, startTimer, resetTimer, testDom, currentTime } = require("./index");

test('checks break toggle', () => {
  expect(togglePomoBreak(true)).toBe(false);
  expect(togglePomoBreak(false)).toBe(true);
});
  
test('checks start state', () => {
  fs.readFile('../index.html', 'utf8' , (err, data) => {
    if (err) {
      return
    }
    document.body.innerHTML = data;
  expect(startTimer()).toStrictEqual(["pomo", 0, "✖ Reset"]);
  expect(startTimer()).toStrictEqual(["short break", 1,"✖ Reset"]);
  expect(startTimer()).toStrictEqual(["pomo", 1, "✖ Reset"]);
  expect(startTimer()).toStrictEqual(["short break", 2,"✖ Reset"]);
  expect(startTimer()).toStrictEqual(["pomo", 2, "✖ Reset"]);
  expect(startTimer()).toStrictEqual(["short break", 3,"✖ Reset"]);
  expect(startTimer()).toStrictEqual(["pomo",3, "✖ Reset"]);
  expect(startTimer()).toStrictEqual(["long break", 0,"✖ Reset"]);
  expect(startTimer()).toStrictEqual(["pomo", 0, "✖ Reset"]);
  expect(startTimer()).toStrictEqual(["short break", 1, "✖ Reset"]);
  resetTimer();
  expect(startTimer()).toStrictEqual(["pomo", 0, "✖ Reset"]);
  expect(startTimer()).toStrictEqual(["short break", 1, "✖ Reset"]);
  });
});
  
test('checks reset state', () => {
  expect(resetTimer()).toStrictEqual(["stopped", 0, "▶ Begin"]);
});

test('Check current time display', ()=>{
  fs.readFile('../index.html', 'utf8' , (err, data) => {
    if (err) {
      return
    }
    document.body.innerHTML = data;
    currentTime(1500, document.querySelector('#countdownText'));
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("25:00");
  
    currentTime(319, document.querySelector('#countdownText'));
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("05:19");
  
    currentTime(23, document.querySelector('#countdownText'));
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("00:23");
  });
});

test('Test timer fraction', () => {
  fs.readFile('../index.html', 'utf8' , (err, data) => {
    if (err) {
      return
    }
    document.body.innerHTML = data;
    pomoState = timerOptions.POMO;
    expect(timeFraction(150)).toStrictEqual(0.1);
    expect(timeFraction(1500)).toStrictEqual(1);
    pomoState = timerOptions.SHORT;
    expect(timeFraction(150)).toStrictEqual(0.5);
    expect(timeFraction(60)).toStrictEqual(0.2);
    pomoState = timerOptions.LONG;
    console.log(pomoState);
    expect(timeFraction(810)).toStrictEqual(0.9);
    expect(timeFraction(450)).toStrictEqual(0.5);
  });
});

test('Checking begin countdown', () => {
  fs.readFile('../index.html', 'utf8' , (err, data) => {
    if (err) {
      return
    }
    document.body.innerHTML = data;

    pomoCount = 0;
    beginCountdown(1500, document.querySelector('#countdownText'));
    expect(pomoState).toStrictEqual("stopped");
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("5:00");

    pomoCount = 3;
    beginCountdown(1500, document.querySelector('#countdownText'));
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("15:00");

    pomoCount = 1;
    beginCountdown(1500, document.querySelector('#countdownText'));
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("5:00");
  });
});

test('Checking begin break', () => {
  fs.readFile('../index.html', 'utf8' , (err, data) => {
    if (err) {
      return
    }
    document.body.innerHTML = data;
    beginBreak(300, document.querySelector('#countdownText'));
    expect(document.querySelector('#countdownText').textContent).toStrictEqual("25:00");
  });
});