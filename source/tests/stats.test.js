import * as Constants from '../scripts/constants';
import * as Stats from '../scripts/stats';
import { taskComplete } from '../scripts/taskButton';
import { updatePomoCount, updateInterruptions } from '../scripts/startResetButton';
 
describe('Daily Statistics', () => {
  beforeEach(() => {
    localStorage.removeItem(Constants.TODAY_POMO_ID);
    localStorage.removeItem(Constants.TODAY_TASK_ID);
    localStorage.removeItem(Constants.TODAY_INTERRUPTION);
  });

  // Tests on Pomodoro cycles 
  test('Check when there are zero pomodoro cycles completed', () => {
    localStorage.setItem(Constants.TODAY_POMO_ID, '0');
    Stats.displayTodayStats();
    expect(document.getElementById('today-pomodoros').textContent).toBe('0');
  });

  test('Check that pomodoro cycle count display correctly reflects cycle count', () =>{
    localStorage.setItem(Constants.TODAY_POMO_ID, '15');
    Stats.displayTodayStats();
    expect(document.getElementById('today-pomodoros').textContent).toBe('15');  
  })

  test ('Check to see that pomo cycle count resets when it is new day', ()=>{
    localStorage.setItem(Constants.TODAY_POMO_ID, '6');
    Stats.displayTodayStats();
    expect(document.getElementById('today-pomodoros').textContent).toBe('6');
    updatePomoCount(Number(localStorage.getItem(Constants.TODAY_POMO_ID)), new Date(2022, 3, 3)); // 3-3-2022
    Stats.displayTodayStats();
    expect(localStorage.getItem("today-pomo-count")).toStrictEqual("1");
  });

  // Tests on Tasks completed  
  test('Check when there are zero tasks completed', () => {
    Stats.displayTodayStats();
    expect(document.getElementById('today-tasks').textContent).toBe('0');
  });
  
  test('Check that today tasks count display correctly reflects today tasks', () =>{
    localStorage.setItem(Constants.TODAY_TASK_ID, '4');
    Stats.displayTodayStats();
    expect(document.getElementById('today-tasks').textContent).toBe('4');  
  })
  
  test ('Check to see that task count resets when it is new day', ()=>{
    let storage = taskComplete(true, new Date(2021, 3, 2)); // 3-2-2021
    localStorage.setItem(Constants.TODAY_TASK_ID, '5');
    Stats.displayTodayStats();
    expect(document.getElementById('today-tasks').textContent).toBe('5');
    storage = taskComplete(false, new Date(2022, 3, 3)); // 3-3-2022
    Stats.displayTodayStats();
    expect(storage.getItem("today-task-count")).toStrictEqual("1");
  });

  // Tests on Interruptions 
  test('Check when there are zero interruptions', () => {
    Stats.displayTodayStats();
    expect(document.getElementById('today-interruptions').textContent).toBe('0');
  });
  
  test('Check that today interruptions count display correctly reflects today interruptions', () =>{
    localStorage.setItem(Constants.TODAY_INTERRUPTION, '6');
    Stats.displayTodayStats();
    expect(document.getElementById('today-interruptions').textContent).toBe('6');  
  })
  
  test ('Check to see that interruptions count resets when it is new day', ()=>{
    localStorage.setItem(Constants.TODAY_INTERRUPTION, '17');
    Stats.displayTodayStats();
    expect(document.getElementById('today-interruptions').textContent).toBe('17');
    updateInterruptions(2, "03/3/22");
    Stats.displayTodayStats();
    expect(localStorage.getItem("today-interruptions")).toStrictEqual("1");
  });
});

describe('Total Statistics', () => {
  beforeEach(() => {
    localStorage.removeItem(Constants.TOTAL_INTERRUPTION);
    localStorage.removeItem(Constants.TOTAL_TASK_ID);
    localStorage.removeItem(Constants.TOTAL_INTERRUPTION);
  });

  test('if the total pomodoros completed display defaults to 0', () => {
    Stats.displayTotalStats();
    expect(document.getElementById('total-pomodoros').textContent).toBe('0');
  });

  test('if the total tasks completed display defaults to 0', () => {
    Stats.displayTotalStats();
    expect(document.getElementById('total-tasks').textContent).toBe('0');
  });

  test('if the total avg. interruptions display defaults to 0.00', () => {
    Stats.displayTotalStats();
    expect(document.getElementById('total-interruptions').textContent).toBe('0.00');
  });

  test('if total pomodoros completed is correctly displayed', () => {
    localStorage.setItem(Constants.TOTAL_POMO_ID, '7');
    Stats.displayTotalStats();
    expect(document.getElementById('total-pomodoros').textContent).toBe('7');
  });

  test('if total avg. interruptions per pomodoro is correctly displayed', () => {
    localStorage.setItem(Constants.TOTAL_INTERRUPTION, '9');
    localStorage.setItem(Constants.TOTAL_POMO_ID, '4');
    Stats.displayTotalStats();
    expect(document.getElementById('total-interruptions').textContent).toBe('2.25');
  });

  test('if total tasks completed is correctly displayed', () => {
    localStorage.setItem(Constants.TOTAL_TASK_ID, '3');
    Stats.displayTotalStats();
    expect(document.getElementById('total-tasks').textContent).toBe('3');
  });
});
