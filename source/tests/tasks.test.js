import * as Constants from '../scripts/constants';
import { completeTask, increaseTaskPomo, resetTaskPomo } from '../scripts/tasks';
import * as Storage from '../scripts/util/storage';

beforeEach(() => {
  window.localStorage.clear();
});

test('Checks incrementing task pomo counter from 0 to 1', () => {
  increaseTaskPomo();
  expect(document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML).toBe('1');
});

test('Checks incrementing non-zero task pomo counter', () => {
  increaseTaskPomo();
  expect(document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML).toBe('2');
});

test('Checks if reset task pomos sets non-zero task pomo counter to 0', () => {
  resetTaskPomo();
  expect(document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML).toBe('0');
});

test('Checks if reset task pomos sets zeroed task pomo counter to 0', () => {
  resetTaskPomo();
  expect(document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML).toBe('0');
});

test('Checks if completing a task resets the task pomo counter', () => {
  increaseTaskPomo();
  completeTask();
  expect(document.getElementById(Constants.TASK_POMO_COUNTER).innerHTML).toBe('0');
});

// test('Checks if task complete button is disabled when pomo count is 0', () => {
//   resetTaskPomo();
//   expect(document.getElementById(Constants.TASK_BTN_ID).disabled).toBe(true);
// });

// test('Checks if task complete button is enabled when pomo count > 0', () => {
//   increaseTaskPomo();
//   expect(document.getElementById(Constants.TASK_BTN_ID).disabled).toBe(false);
// });

// test('Checks if completing a task disables the task complete button', () => {
//   resetTaskPomo();
//   increaseTaskPomo();
//   expect(document.getElementById(Constants.TASK_BTN_ID).disabled).toBe(true);
// });