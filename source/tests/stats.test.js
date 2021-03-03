const { displayTodayStats, displayTotalStats } = require('../scripts/stats');
const { taskComplete  } = require('../scripts/taskButton');
const { updatePomoCount,
    updateDistractions } = require('../scripts/startResetButton');
 
describe('statistics', () => {
  const TODAY_POMO_ID = 'today-pomo-count';
  const TODAY_TASK_ID = 'today-task-count';
  const TODAY_DISTRACTION = 'today-distraction';

  beforeEach(() => {
      localStorage.removeItem(TODAY_POMO_ID);
      localStorage.removeItem(TODAY_TASK_ID);
      localStorage.removeItem(TODAY_DISTRACTION);
  });

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

  // Tests on Pomodoro cycles 
  test('Check when there are zero pomodoro cycles completed', () => {
      localStorage.setItem(TODAY_POMO_ID, '0');
      displayTodayStats();
      expect(document.getElementById('today-pomodoros').textContent).toBe('0');
  });

  test('Check that pomodoro cycle count display correctly reflects cycle count', () =>{
      localStorage.setItem(TODAY_POMO_ID, '15');
      displayTodayStats();
      expect(document.getElementById('today-pomodoros').textContent).toBe('15');  
  })

  test ('Check to see that pomo cycle count resets when it is new day', ()=>{
      localStorage.setItem(TODAY_POMO_ID, '6');
      displayTodayStats();
      expect(document.getElementById('today-pomodoros').textContent).toBe('6');
      updatePomoCount(Number(localStorage.getItem(TODAY_POMO_ID)), new Date(2022, 3, 3)); // 3-3-2022
      displayTodayStats();
      expect(localStorage.getItem("today-pomo-count")).toStrictEqual("1");
  });


  // Tests on Tasks completed  
  test('Check when there are zero tasks completed', () => {
      displayTodayStats();
      expect(document.getElementById('today-tasks').textContent).toBe('0');
  });

  test('Check that today tasks count display correctly reflects today tasks', () =>{
      localStorage.setItem(TODAY_TASK_ID, '4');
      displayTodayStats();
      expect(document.getElementById('today-tasks').textContent).toBe('4');  
  })

  test ('Check to see that task count resets when it is new day', ()=>{
      let storage = taskComplete(true, new Date(2021, 3, 2)); // 3-2-2021
      localStorage.setItem(TODAY_TASK_ID, '5');
      displayTodayStats();
      expect(document.getElementById('today-tasks').textContent).toBe('5');
      storage = taskComplete(false, new Date(2022, 3, 3)); // 3-3-2022
      displayTodayStats();
      expect(storage.getItem("today-task-count")).toStrictEqual("1");
  });


  // Tests on Distractions 
  test('Check when there are zero distractions', () => {
      displayTodayStats();
      expect(document.getElementById('today-distractions').textContent).toBe('0');
  });

  test('Check that today distractions count display correctly reflects today distractions', () =>{
      localStorage.setItem(TODAY_DISTRACTION, '6');
      displayTodayStats();
      expect(document.getElementById('today-distractions').textContent).toBe('6');  
  })

  test ('Check to see that distractions count resets when it is new day', ()=>{
      localStorage.setItem(TODAY_DISTRACTION, '17');
      displayTodayStats();
      expect(document.getElementById('today-distractions').textContent).toBe('17');
      updateDistractions(2, "03/3/22");
      displayTodayStats();
      expect(localStorage.getItem("today-distraction")).toStrictEqual("1");
  });
});
