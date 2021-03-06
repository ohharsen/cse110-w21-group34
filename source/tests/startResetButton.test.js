import * as Constants from '../scripts/constants';
import {
    beginBreak,
    beginCountdown,
    togglePomoBreak,
    startTimer,
    resetTimer,
    updateDistractions,
    currentTime,
    timeFraction,
} from '../scripts/startResetButton';

import { formatDate } from '../scripts/taskButton';


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
    expect(resetTimer()).toStrictEqual([Constants.timerOptions.STOPPED, "▶ Begin"]);
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
    expect(timeFraction(150, Constants.timerOptions.POMO)).toStrictEqual(0.1);
    expect(timeFraction(1500, Constants.timerOptions.POMO)).toStrictEqual(1);
    expect(timeFraction(150, Constants.timerOptions.SHORT)).toStrictEqual(0.5);
    expect(timeFraction(60, Constants.timerOptions.SHORT)).toStrictEqual(0.2);
    expect(timeFraction(810, Constants.timerOptions.LONG)).toStrictEqual(0.9);
    expect(timeFraction(450, Constants.timerOptions.LONG)).toStrictEqual(0.5);
});

describe('Timer Countdown Functions', () =>{
    test.todo('Check beginCountdown() method for work cycles');
    test.todo('Check beginBreak() method for breaks');
});