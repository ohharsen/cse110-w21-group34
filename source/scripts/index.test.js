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
    testDom();
  expect(startTimer()).toStrictEqual(["pomo","✖ Reset"]);
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
    testDom();
  expect(currentTime(1500, document.querySelector('#countdownText'))).toStrictEqual("25:00");
  expect(currentTime(319, document.querySelector('#countdownText'))).toStrictEqual("05:19");
  expect(currentTime(23, document.querySelector('#countdownText'))).toStrictEqual("00:23");
  });
});

test('checks reset state', () => {
  fs.readFile('../index.html', 'utf8' , (err, data) => {
    if (err) {
      return
    }
    document.body.innerHTML = data;
    testDom();
    expect(document.querySelector("title").innerText).toStrictEqual("Test Text");
  });
});

