import * as Constants from '../scripts/constants';
import {
    togglePomoBreak,
    startTimer,
    resetTimer,
    currentTime,
    timeFraction,
    timerTypeIndicator,
} from '../scripts/timer';
import * as Storage from '../scripts/util/storage';

beforeEach(() => {
    localStorage.clear();
});

test('checks break toggle', () => {
    expect(togglePomoBreak(true)).toBe(false);
    expect(togglePomoBreak(false)).toBe(true);
  });
    
test('checks start state', () => {
    expect(startTimer(false, 0)).toStrictEqual([Constants.timerOptions.POMO, 0]);
    expect(startTimer(true, 0)).toStrictEqual([Constants.timerOptions.SHORT, 1]);
    expect(startTimer(false, 1)).toStrictEqual([Constants.timerOptions.POMO, 1]);
    expect(startTimer(true, 1)).toStrictEqual([Constants.timerOptions.SHORT, 2]);
    expect(startTimer(false, 2)).toStrictEqual([Constants.timerOptions.POMO, 2]);
    expect(startTimer(true, 2)).toStrictEqual([Constants.timerOptions.SHORT, 3]);
    expect(startTimer(false, 3)).toStrictEqual([Constants.timerOptions.POMO,3]);
    expect(startTimer(true, 3)).toStrictEqual([Constants.timerOptions.SHORT, 4]);
});
    
test('checks reset state', () => {
    window.confirm = function () {
        return true;
    };
    expect(resetTimer()).toStrictEqual([Constants.timerOptions.STOPPED, Constants.BEGIN_BTN_TXT]);

    window.confirm = function () {
        return false;
    };
    expect(resetTimer()).toStrictEqual();
});
  
test('Check resetting timer increments interruptions', () => {
    window.confirm = function () {
        return true;
    };
    resetTimer();
    expect(Storage.getInterruptions()).toBe(1);
});

test('Check multiple timer resets increments interruptions', () => {
    const targetInterruptions = 6;
    for (let i = 0; i < targetInterruptions; i++) {
        window.confirm = function () {
            return true;
        };
        resetTimer();
    }
    expect(Storage.getInterruptions()).toBe(targetInterruptions);
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

test('test timerTypeIndicator', () => {
    timerTypeIndicator(Constants.timerOptions.LONG);
    expect(document.getElementById('work-indicator').classList[1]).toBe(undefined);
    expect(document.getElementById('long-break-indicator').classList[1]).toBe('highlight');
    expect(document.getElementById('short-break-indicator').classList[1]).toBe(undefined);

    timerTypeIndicator(Constants.timerOptions.SHORT);
    expect(document.getElementById('work-indicator').classList[1]).toBe(undefined);
    expect(document.getElementById('long-break-indicator').classList[1]).toBe(undefined);
    expect(document.getElementById('short-break-indicator').classList[1]).toBe('highlight');

    timerTypeIndicator(Constants.timerOptions.POMO);
    expect(document.getElementById('work-indicator').classList[1]).toBe('highlight');
    expect(document.getElementById('long-break-indicator').classList[1]).toBe(undefined);
    expect(document.getElementById('short-break-indicator').classList[1]).toBe(undefined);
});