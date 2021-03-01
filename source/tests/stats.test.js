const { displayTotalStats } = require('../scripts/stats');

describe('statistics', () => {
  const TOTAL_POMO_ID = 'total-pomo-count';
  const TOTAL_TASK_ID = 'total-task-count';
  const TODAY_TASK_ID = 'today-task-count';

  beforeEach(() => {
    localStorage.removeItem(TOTAL_POMO_ID);
    localStorage.removeItem(TOTAL_TASK_ID);
    localStorage.removeItem(TODAY_TASK_ID);
  });

  test.todo('if open-button opens stats-pane');
  test.todo('if close-button closes stats-pane, after opening');
  test.todo('if open-button opens stats-pane, after closing');

  test('if the total pomodoros completed display defaults to 0', () => {
    displayTotalStats();
    expect(document.getElementById('total-pomodoros').textContent).toBe('0');
  });
  
  test('if the total tasks completed display defaults to 0', () => {
    displayTotalStats();
    expect(document.getElementById('total-tasks').textContent).toBe('0');
  });
  
  test('if the total avg. distractions display defaults to 0.00', () => {
    displayTotalStats();
    expect(document.getElementById('total-distractions').textContent).toBe('0.00');
  });
  
  test.todo('if highest pomodoros in a single day defaults to 0');

  test('if total pomodoros completed is correctly displayed', () => {
    localStorage.setItem(TOTAL_POMO_ID, '7');
    displayTotalStats();
    expect(document.getElementById('total-pomodoros').textContent).toBe('7');
  });

  test('if total avg. distraction per pomodoro is correctly displayed', () => {
    localStorage.setItem(TOTAL_DISTRACTION, '9');
    localStorage.setItem(TOTAL_POMO_ID, '4');
    displayTotalStats();
    expect(document.getElementById('total-distractions').textContent).toBe('2.25');
  });

  test('if total tasks completed is correctly displayed', () => {
    localStorage.setItem(TOTAL_TASK_ID, '3');
    displayTotalStats();
    expect(document.getElementById('total-tasks').textContent).toBe('3');
  });

  test.todo('if highest pomodoros in a single day is correctly displayed');
  test.todo('if opening the stats pane displays stats');
});