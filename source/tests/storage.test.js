import * as Storage from '../scripts/util/storage';

describe('Helper Methods', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Check isSameDay returns true for today and today', () => {
        const today1 = new Date();
        const today2 = new Date();
        const result = Storage.isSameDay(today1, today2);
        expect(result).toBe(true);
    });

    test('Check isSameDay returns false for today and yesterday', () => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setDate(date2.getDate() - 1);
        const result = Storage.isSameDay(date1, date2);
        expect(result).toBe(false);
    });
    
    test('Check isSameDay returns false for different dates', () => {
        const date1 = new Date();
        const date2 = new Date(date1);
        const newDate = (date1.getDate() == 7) ? 6 : 7;
        date2.setDate(newDate);
        const result = Storage.isSameDay(date1, date2);
        expect(result).toBe(false);
    });

    test('Check isSameDay returns false for different months', () => {
        const date1 = new Date();
        const date2 = new Date(date1);
        const newMonth = (date1.getMonth() == 7) ? 6 : 7;
        date2.setMonth(newMonth);
        const result = Storage.isSameDay(date1, date2);
        expect(result).toBe(false);
    });

    test('Check isSameDay returns false for different years', () => {
        const date1 = new Date();
        const date2 = new Date(date1);
        const newYear = (date1.getFullYear() == 2000) ? 1999 : 2000;
        date2.setFullYear(newYear);
        const result = Storage.isSameDay(date1, date2);
        expect(result).toBe(false);
    });

    test('Check if undefined storage date today-checker returns false', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        localStorage.setItem(Storage.TODAY_DATE_ID, yesterday);
        expect(Storage.isStorageDateToday()).toBe(false);
    });

    test('Check if today storage date today-checker returns true', () => {
        const today = new Date();
        localStorage.setItem(Storage.TODAY_DATE_ID, today);
        expect(Storage.isStorageDateToday()).toBe(true);
    });
    
    test('Check if undefined storage date is not today', () => {
        const today = new Date();
        expect(Storage.isSameDay(today, Storage.getTodayStorageDate())).toBe(false);
    });
});

describe('Pomodoro Count', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Check if undefined pomo count returns 0', () => {
        expect(Storage.getPomoCount()).toBe(0);
    });

    test('Check if undefined pomo count weekly history returns 0', () => {
        expect(Storage.getBestDailyPomoCount()).toBe(0);
    });

    test('Check if undefined total pomo count returns 0', () => {
        expect(Storage.getTotalPomoCount()).toBe(0);
    });

    test('Check if storage increments undefined pomo count', () => {
        Storage.incrPomoCount();
        expect(Storage.getPomoCount()).toBe(1);
    });
    
    test('Check if storage increments undefined total pomo count', () => {
        Storage.incrPomoCount();
        expect(Storage.getTotalPomoCount()).toBe(1);
    });

    test('Check if storage increments current pomo count', () => {
        localStorage.setItem(Storage.TODAY_POMO_ID, '6');
        Storage.incrPomoCount();
        expect(Storage.getPomoCount()).toBe(7);
    });

    test('Check if storage increments current pomo count', () => {
        localStorage.setItem(Storage.WEEK_HISTORY, '6');
        Storage.incrPomoCount();
        expect(Storage.getWeeklyHistory()).toBe('7');
    });

    test('Check if storage increments total pomo count', () => {
        localStorage.setItem(Storage.TOTAL_POMO_ID, '6');
        Storage.incrPomoCount();
        expect(Storage.getTotalPomoCount()).toBe(7);
    });

    test('Check to see that pomo cycle count resets when it is new day', () => {
        localStorage.setItem(Constants.TODAY_POMO_ID, '6');
        Storage.incrPomoCount(Number(localStorage.getItem(Constants.TODAY_POMO_ID)), new Date(2022, 3, 3)); // 3-3-2022
        expect(document.getElementById('today-pomodoros').textContent).toBe('6');
        Storage.displayTodayStats();
        expect(localStorage.getItem("today-pomo-count")).toStrictEqual("1");
    });
});

describe('Tasks', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Check if undefined task count returns 0', () => {
        expect(Storage.getTasksCount()).toBe(0);
    });

    test('Check if undefined total tasks count returns 0', () => {
        expect(Storage.getTotalTasksCount()).toBe(0);
    });

    test('Check if storage increments undefined task count', () => {
        Storage.incrPomoCount();
        expect(Storage.getTasksCount()).toBe(1);
    });
    
    test('Check if storage increments undefined total task count', () => {
        Storage.incrPomoCount();
        expect(Storage.getTotalTasksCount()).toBe(1);
    });

    test('Check if storage increments current task count', () => {
        localStorage.setItem(Storage.TODAY_TASK_ID, '2');
        Storage.incrPomoCount();
        expect(Storage.getTasksCount()).toBe(3);
    });

    test('Check if storage increments total task count', () => {
        localStorage.setItem(Storage.TOTAL_TASK_ID, '43');
        Storage.incrPomoCount();
        expect(Storage.getTotalTasksCount()).toBe(44);
    });
    
    test ('Check to see that task count resets when it is new day', () => {
      let storage = taskComplete(true, new Date(2021, 3, 2)); // 3-2-2021
      localStorage.setItem(Constants.TODAY_TASK_ID, '5');
      Stats.displayTodayStats();
      expect(document.getElementById('today-tasks').textContent).toBe('5');
      storage = taskComplete(false, new Date(2022, 3, 3)); // 3-3-2022
      Stats.displayTodayStats();
      expect(storage.getItem("today-task-count")).toStrictEqual("1");
    });
});

describe('Distractions', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('Check if undefined distractions count returns 0', () => {
        expect(Storage.getDistractions()).toBe(0);
    });

    test('Check if undefined total distractions count returns 0', () => {
        expect(Storage.getTotalDistractions()).toBe(0);
    });

    test('Check if storage increments undefined distraction count', () => {
        Storage.incrDistractions();
        expect(Storage.getDistractions()).toBe(1);
    });
    
    test('Check if storage increments undefined total distraction count', () => {
        Storage.incrDistractions();
        expect(Storage.getTotalDistractions()).toBe(1);
    });

    test('Check if storage increments current distraction count', () => {
        localStorage.setItem(Storage.TODAY_DISTRACTION, '17');
        Storage.incrDistractions();
        expect(Storage.getDistractions()).toBe(18);
    });

    test('Check if storage increments total distraction count', () => {
        localStorage.setItem(Storage.TOTAL_DISTRACTION, '74');
        Storage.incrDistractions();
        expect(Storage.getTotalDistractions()).toBe(75);
    });
    
    test ('Check to see that distractions count resets when it is new day', () => {
      localStorage.setItem(Constants.TODAY_DISTRACTION, '17');
      Stats.displayTodayStats();
      expect(document.getElementById('today-distractions').textContent).toBe('17');
      updateDistractions(2, "03/3/22");
      Stats.displayTodayStats();
      expect(localStorage.getItem("today-distraction")).toStrictEqual("1");
    });    
});

describe.todo('deifne', () => {
    test('checks local storage 0', () => { // test empty storage
        taskComplete(new Date(2021, 1, 18)); // 2-18-2021
      
        expect(window.localStorage.getItem(Storage.TOTAL_TASK_ID)).toStrictEqual("1");
        expect(window.localStorage.getItem(Storage.TODAY_TASK_ID)).toStrictEqual("1");
        expect(window.localStorage.getItem(Storage.WEEK_TASK_ID)).toStrictEqual("1");
        expect(window.localStorage.getItem(Storage.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
        expect(window.localStorage.getItem(Storage.WEEK_START_ID)).toStrictEqual("02/15/2021");
      });
      
      test('checks local storage 1', () => { // test different week
        taskComplete(new Date(2021, 1, 10)); // 2-10-2021
        taskComplete(new Date(2021, 1, 16)); // 2-16-2021
      
        expect(window.localStorage.getItem(Storage.TOTAL_TASK_ID)).toStrictEqual("2");
        expect(window.localStorage.getItem(Storage.TODAY_TASK_ID)).toStrictEqual("1");
        expect(window.localStorage.getItem(Storage.WEEK_TASK_ID)).toStrictEqual("1");
        expect(window.localStorage.getItem(Storage.TODAY_DATE_ID)).toStrictEqual("02/16/2021");
        expect(window.localStorage.getItem(Storage.WEEK_START_ID)).toStrictEqual("02/15/2021"); // should update to new week start
      });
      
      test('checks local storage 2', () => { // test different day, same week
        taskComplete(new Date(2021, 1, 17)); // 2-17-2021
        taskComplete(new Date(2021, 1, 18)); // 2-18-2021
      
        expect(window.localStorage.getItem(Storage.TOTAL_TASK_ID)).toStrictEqual("2");
        expect(window.localStorage.getItem(Storage.TODAY_TASK_ID)).toStrictEqual("1");
        expect(window.localStorage.getItem(Storage.WEEK_TASK_ID)).toStrictEqual("2");
        expect(window.localStorage.getItem(Storage.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
        expect(window.localStorage.getItem(Storage.WEEK_START_ID)).toStrictEqual("02/15/2021");
      });
      
      test('checks local storage 3', () => { // test same day, same week
        taskComplete(new Date(2021, 1, 18)); // 2-18-2021
        taskComplete(new Date(2021, 1, 18)); // 2-18-2021
      
        expect(window.localStorage.getItem(Storage.TOTAL_TASK_ID)).toStrictEqual("2");
        expect(window.localStorage.getItem(Storage.TODAY_TASK_ID)).toStrictEqual("2");
        expect(window.localStorage.getItem(Storage.WEEK_TASK_ID)).toStrictEqual("2");
        expect(window.localStorage.getItem(Storage.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
        expect(window.localStorage.getItem(Storage.WEEK_START_ID)).toStrictEqual("02/15/2021");
      });
      
      test('checks isSameWeek 0', () => { // is same week
        taskComplete(new Date(2021, 1, 18));
        expect(isSameWeek(new Date(2021, 1, 21))).toStrictEqual(true);
      });
      
      test('checks isSameWeek 1', () => { // is not same week
        taskComplete(new Date(2021, 1, 18));
        expect(isSameWeek(new Date(2021, 1, 22))).toStrictEqual(false);
      });
      
      test('checks resetWeekArray', () => {
        taskComplete(new Date(2021, 1, 18));
        resetWeekArray();
        let weekHistory = JSON.stringify([0, 0, 0, 0, 0, 0, 0]); // reset
      
        expect(window.localStorage.getItem(Storage.WEEK_HISTORY)).toStrictEqual(weekHistory);
      });
});