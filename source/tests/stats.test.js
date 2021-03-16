import * as Constants from '../scripts/constants';
import * as Stats from '../scripts/stats';
import * as Storage from '../scripts/util/storage';
import { taskComplete } from '../scripts/tasks';
 
describe('Daily Statistics', () => {
  const todayPomosID = 'today-pomodoros';
  const todayTasksID = 'today-tasks';
  const todayDistractionsID = 'today-distractions';

  beforeEach(() => {
    localStorage.clear();
  });

  // Tests on Pomodoro cycles 
  test('Check when there are zero pomodoro cycles completed', () => {
    Stats.displayTodayStats();
    expect(document.getElementById(todayPomosID).textContent).toBe('0');
  });

  test('Check that pomodoro cycle count display correctly reflects cycle count', () =>{
    localStorage.setItem(Storage.TODAY_POMO_ID, '15');
    Stats.displayTodayStats();
    expect(document.getElementById(todayPomosID).textContent).toBe('15');  
  })

  test ('Check to see that pomo cycle count resets when it is new day', ()=>{
    localStorage.setItem(Storage.TODAY_POMO_ID, '6');
    Stats.displayTodayStats();
    expect(document.getElementById(todayPomosID).textContent).toBe('6');
    // New day
    new Date(2022, 3, 3)
    Storage.incrPomoCount(); // 3-3-2022
    Stats.displayTodayStats();
    expect(document.getElementById(todayPomosID).textContent).toBe('1');
  });

  // Tests on Tasks completed  
  test('Check when there are zero tasks completed', () => {
    Stats.displayTodayStats();
    expect(document.getElementById(todayTasksID).textContent).toBe('0');
  });
  
  test('Check that today tasks count display correctly reflects today tasks', () =>{
    localStorage.setItem(Storage.TODAY_TASK_ID, '4');
    Stats.displayTodayStats();
    expect(document.getElementById(todayTasksID).textContent).toBe('4');  
  })
  
  test ('Check to see that task count resets when it is new day', ()=>{
    let storage = taskComplete(true, new Date(2021, 3, 2)); // 3-2-2021
    localStorage.setItem(Constants.TODAY_TASK_ID, '5');
    Stats.displayTodayStats();
    expect(document.getElementById(todayTasksID).textContent).toBe('5');
    // New day
    storage = taskComplete(false, new Date(2022, 3, 3)); // 3-3-2022
    Stats.displayTodayStats();
    expect(document.getElementById(todayTasksID).textContent).toBe('1');
  });

  // Tests on Distractions 
  test('Check when there are zero distractions', () => {
    Stats.displayTodayStats();
    expect(document.getElementById(todayDistractionsID).textContent).toBe('0');
  });
  
  test('Check that today distractions count display correctly reflects today distractions', () =>{
    localStorage.setItem(Storage.TODAY_DISTRACTION, '6');
    Stats.displayTodayStats();
    expect(document.getElementById(todayDistractionsID).textContent).toBe('6');  
  })
  
  test ('Check to see that distractions count resets when it is new day', ()=>{
    localStorage.setItem(Constants.TODAY_DISTRACTION, '17');
    Stats.displayTodayStats();
    expect(document.getElementById(todayDistractionsID).textContent).toBe('17');
    // New day
    Storage.incrDistractions();
    Stats.displayTodayStats();
    expect(document.getElementById(todayDistractionsID).textContent).toBe('1');
  });
});

describe('Total Statistics', () => {
  const totalPomosID = 'total-pomodoros';
  const totalTasksID = 'total-tasks';
  const totalDistractionsID = 'total-distractions';

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

  test('if the total avg. distractions display defaults to 0.00', () => {
    Stats.displayTotalStats();
    expect(document.getElementById(totalDistractionsID).textContent).toBe('0.00');
  });

  test('if total pomodoros completed is correctly displayed', () => {
    localStorage.setItem(Storage.TOTAL_POMO_ID, '7');
    Stats.displayTotalStats();
    expect(document.getElementById(totalPomosID).textContent).toBe('7');
  });

  test('if total avg. distraction per pomodoro is correctly displayed', () => {
    localStorage.setItem(Storage.TOTAL_DISTRACTION, '9');
    localStorage.setItem(Storage.TOTAL_POMO_ID, '4');
    Stats.displayTotalStats();
    expect(document.getElementById(totalDistractionsID).textContent).toBe('2.25');
  });

  test('if total tasks completed is correctly displayed', () => {
    localStorage.setItem(Storage.TOTAL_TASK_ID, '3');
    Stats.displayTotalStats();
    expect(document.getElementById(totalTasksID).textContent).toBe('3');
  });
});
