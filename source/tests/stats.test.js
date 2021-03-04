import * as Constants from '../scripts/constants';
import * as Stats from '../scripts/stats';
import { taskComplete } from '../scripts/taskButton';
import { updatePomoCount, updateDistractions } from '../scripts/startResetButton';
 
describe('statistics', () => {
    beforeEach(() => {
        localStorage.removeItem(Constants.TODAY_POMO_ID);
        localStorage.removeItem(Constants.TODAY_TASK_ID);
        localStorage.removeItem(Constants.TODAY_DISTRACTION);
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


    // Tests on Distractions 
    test('Check when there are zero distractions', () => {
        Stats.displayTodayStats();
        expect(document.getElementById('today-distractions').textContent).toBe('0');
    });

    test('Check that today distractions count display correctly reflects today distractions', () =>{
        localStorage.setItem(Constants.TODAY_DISTRACTION, '6');
        Stats.displayTodayStats();
        expect(document.getElementById('today-distractions').textContent).toBe('6');  
    })

    test ('Check to see that distractions count resets when it is new day', ()=>{
        localStorage.setItem(Constants.TODAY_DISTRACTION, '17');
        Stats.displayTodayStats();
        expect(document.getElementById('today-distractions').textContent).toBe('17');
        updateDistractions(2, "03/3/22");
        Stats.displayTodayStats();
        expect(localStorage.getItem("today-distraction")).toStrictEqual("1");
    });
});
