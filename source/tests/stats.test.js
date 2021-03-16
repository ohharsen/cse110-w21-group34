import * as Constants from '../scripts/constants';
import * as Stats from '../scripts/stats';
import * as Storage from '../scripts/util/storage';
import { completeTask } from '../scripts/tasks';
 
describe('Daily Statistics', () => {
  const todayPomosID = 'today-pomodoros';
  const todayTasksID = 'today-tasks';
  const todayInterruptionsID = 'today-interruptions';

  beforeEach(() => {
    localStorage.clear();
  });

  // Tests on Pomodoro cycles 
  test('Check when there are zero pomodoro cycles completed', () => {
    Stats.displayTodayStats();
    expect(document.getElementById(todayPomosID).textContent).toBe('0');
  });

  test('Check that pomodoro cycle count display correctly reflects cycle count', () => {
    localStorage.setItem(Storage.TODAY_POMO_ID, '15');
    Stats.displayTodayStats();
    expect(document.getElementById(todayPomosID).textContent).toBe('15');  
  })

  // Tests on Tasks completed  
  test('Check when there are zero tasks completed', () => {
    Stats.displayTodayStats();
    expect(document.getElementById(todayTasksID).textContent).toBe('0');
  });
  
  test('Check that today tasks count display correctly reflects today tasks', () => {
    localStorage.setItem(Storage.TODAY_TASK_ID, '4');
    Stats.displayTodayStats();
    expect(document.getElementById(todayTasksID).textContent).toBe('4');  
  })

  // Tests on Interruptions 
  test('Check when there are zero interruptions', () => {
    Stats.displayTodayStats();
    expect(document.getElementById(todayInterruptionsID).textContent).toBe('0');
  });
  
  test('Check that today interruptions count display correctly reflects today interruptions', () => {
    localStorage.setItem(Storage.TODAY_INTERRUPTION, '6');
    Stats.displayTodayStats();
    expect(document.getElementById(todayInterruptionsID).textContent).toBe('6');  
  })
  
  test ('Check to see that interruptions count resets when it is new day', () => {
    localStorage.setItem(Storage.TODAY_INTERRUPTION, '17');
    Stats.displayTodayStats();
    expect(document.getElementById(todayInterruptionsID).textContent).toBe('17');
    // New day
    Storage.incrInterruptions();
    Stats.displayTodayStats();
    expect(document.getElementById(todayInterruptionsID).textContent).toBe('1');
  });
});

describe('Total Statistics', () => {
  const totalPomosID = 'total-pomodoros';
  const totalTasksID = 'total-tasks';
  const totalInterruptionsID = 'total-interruptions';

  beforeEach(() => {
    localStorage.clear();
  });

  test('if the total pomodoros completed display defaults to 0', () => {
    Stats.displayTotalStats();
    expect(document.getElementById(totalPomosID).textContent).toBe('0');
  });

  test('if the total tasks completed display defaults to 0', () => {
    Stats.displayTotalStats();
    expect(document.getElementById(totalTasksID).textContent).toBe('0');
  });

  test('if the total avg. interruptions display defaults to 0.00', () => {
    Stats.displayTotalStats();
    expect(document.getElementById(totalInterruptionsID).textContent).toBe('0.00');
  });

  test('if total pomodoros completed is correctly displayed', () => {
    localStorage.setItem(Storage.TOTAL_POMO_ID, '7');
    Stats.displayTotalStats();
    expect(document.getElementById(totalPomosID).textContent).toBe('7');
  });

  test('if total avg. interruption per pomodoro is correctly displayed', () => {
    localStorage.setItem(Storage.TOTAL_INTERRUPTION, '9');
    localStorage.setItem(Storage.TOTAL_POMO_ID, '4');
    Stats.displayTotalStats();
    expect(document.getElementById(totalInterruptionsID).textContent).toBe('2.25');
  });

  test('if total tasks completed is correctly displayed', () => {
    localStorage.setItem(Storage.TOTAL_TASK_ID, '3');
    Stats.displayTotalStats();
    expect(document.getElementById(totalTasksID).textContent).toBe('3');
  });
});
