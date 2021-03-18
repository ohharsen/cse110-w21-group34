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

    test('Check getting recent monday for same monday', () => {
        const trueMonday = new Date(2021, 2, 8); // month is 0-indexed
        const recentDate = Storage.getRecentMonday(trueMonday);
        const result = Storage.isSameDay(trueMonday, recentDate);
        expect(result).toBe(true);
    });

    test('Check getting recent monday for different monday', () => {
        const trueMonday = new Date(2021, 2, 8); // month is 0-indexed
        const day = new Date(2021, 2, 15); // month is 0-indexed
        const recentDate = Storage.getRecentMonday(day);
        const result = Storage.isSameDay(trueMonday, recentDate);
        expect(result).toBe(false);
    });

    test('Check getting recent monday for same week', () => {
        const trueMonday = new Date(2021, 2, 8); // month is 0-indexed
        const day = new Date(2021, 2, 13); 
        const recentDate = Storage.getRecentMonday(day);
        const result = Storage.isSameDay(trueMonday, recentDate);
        expect(result).toBe(true);
    });

    test('Check getting recent monday for different week', () => {
        const trueMonday = new Date(2021, 2, 8); // month is 0-indexed
        const day = new Date(2021, 2, 17); 
        const recentDate = Storage.getRecentMonday(day);
        const result = Storage.isSameDay(trueMonday, recentDate);
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
        expect(Storage.isSameDay(today, Storage.getDate(Storage.TODAY_DATE_ID))).toBe(false);
    });
    
    test('Clearing weekly history', () => {
        Storage.setWeekHistory(Storage.ZEROS);
        expect(Storage.getWeekHistory()).toStrictEqual([0, 0, 0, 0, 0, 0, 0]);
    });
});

describe('Pomodoro Count', () => {
    beforeEach(() => {
        localStorage.clear();
        Storage.setDate(Storage.TODAY_DATE_ID, new Date());
    });

    test('Check if undefined pomo count returns 0', () => {
        expect(Storage.getCounter(Storage.TODAY_POMO_ID)).toBe(0);
    });

    test('Check if undefined pomo count best day returns 0', () => {
        expect(Storage.getCounter(Storage.BEST_DAILY_POMO_ID)).toBe(0);
    });

    test('Check if undefined pomo count weekly history returns 0s', () => {
        expect(Storage.getWeekHistory()).toStrictEqual([0, 0, 0, 0, 0, 0, 0]);
    });

    test('Check if undefined total pomo count returns 0', () => {
        expect(Storage.getCounter(Storage.TOTAL_POMO_ID)).toBe(0);
    });

    test('Check if storage increments undefined pomo count', () => {
        Storage.incrPomoCount();
        expect(Storage.getCounter(Storage.TODAY_POMO_ID)).toBe(1);
    });
    
    test('Check if storage increments undefined total pomo count', () => {
        Storage.incrPomoCount();
        expect(Storage.getCounter(Storage.TOTAL_POMO_ID)).toBe(1);
    });

    test('Check if storage increments current pomo count', () => {
        localStorage.setItem(Storage.TODAY_POMO_ID, '6');
        Storage.incrPomoCount();
        expect(Storage.getCounter(Storage.TODAY_POMO_ID)).toBe(7);
    });

    test('Check if storage increments total pomo count', () => {
        localStorage.setItem(Storage.TOTAL_POMO_ID, '6');
        Storage.incrPomoCount();
        expect(Storage.getCounter(Storage.TOTAL_POMO_ID)).toBe(7);
    });

    test('Check to see that pomo count resets when it is new day', () => {
        localStorage.setItem(Storage.TODAY_POMO_ID, '6');
        localStorage.setItem(Storage.TODAY_DATE_ID, new Date(0));
        Storage.incrPomoCount();
        expect(Storage.getCounter(Storage.TOTAL_POMO_ID)).toBe(1);
    });
});

describe('Tasks', () => {
    beforeEach(() => {
        localStorage.clear();
        Storage.setDate(Storage.TODAY_DATE_ID, new Date());
    });

    test('Check if undefined task count returns 0', () => {
        expect(Storage.getCounter(Storage.TODAY_TASK_ID)).toBe(0);
    });

    test('Check if undefined total tasks count returns 0', () => {
        expect(Storage.getCounter(Storage.TOTAL_TASK_ID)).toBe(0);
    });

    test('Check if storage increments undefined task count', () => {
        Storage.incrTasks();
        expect(Storage.getCounter(Storage.TODAY_TASK_ID)).toBe(1);
    });
    
    test('Check if storage increments undefined total task count', () => {
        Storage.incrTasks();
        expect(Storage.getCounter(Storage.TOTAL_TASK_ID)).toBe(1);
    });

    test('Check if storage increments current task count', () => {
        localStorage.setItem(Storage.TODAY_TASK_ID, '2');
        Storage.incrTasks();
        expect(Storage.getCounter(Storage.TODAY_TASK_ID)).toBe(3);
    });

    test('Check if storage increments total task count', () => {
        localStorage.setItem(Storage.TOTAL_TASK_ID, '43');
        Storage.incrTasks();
        expect(Storage.getCounter(Storage.TOTAL_TASK_ID)).toBe(44);
    });
    
    test('Check to see that task count resets when it is new day', () => {
        localStorage.setItem(Storage.TODAY_TASK_ID, '6');
        localStorage.setItem(Storage.TODAY_DATE_ID, new Date(0));
        Storage.incrTasks();
        expect(Storage.getCounter(Storage.TODAY_TASK_ID)).toBe(1);
    });
});

describe('Interruptions', () => {
    beforeEach(() => {
        localStorage.clear();
        Storage.setDate(Storage.TODAY_DATE_ID, new Date());
    });

    test('Check if undefined interruptions count returns 0', () => {
        expect(Storage.getCounter(Storage.TODAY_INTERRUPTION)).toBe(0);
    });

    test('Check if undefined total interruptions count returns 0', () => {
        expect(Storage.getCounter(Storage.TOTAL_INTERRUPTION)).toBe(0);
    });

    test('Check if storage increments undefined interruptions count', () => {
        Storage.incrInterruptions();
        expect(Storage.getCounter(Storage.TODAY_INTERRUPTION)).toBe(1);
    });
    
    test('Check if storage increments undefined total interruptions count', () => {
        Storage.incrInterruptions();
        expect(Storage.getCounter(Storage.TOTAL_INTERRUPTION)).toBe(1);
    });

    test('Check if storage increments current interruptions count', () => {
        localStorage.setItem(Storage.TODAY_INTERRUPTION, '17');
        Storage.incrInterruptions();
        expect(Storage.getCounter(Storage.TODAY_INTERRUPTION)).toBe(18);
    });

    test('Check if storage increments total interruptions count', () => {
        localStorage.setItem(Storage.TOTAL_INTERRUPTION, '74');
        Storage.incrInterruptions();
        expect(Storage.getCounter(Storage.TOTAL_INTERRUPTION)).toBe(75);
    });
    
    test('Check to see that interruptions count resets when it is new day', () => {
        localStorage.setItem(Storage.TODAY_INTERRUPTION, '6');
        localStorage.setItem(Storage.TODAY_DATE_ID, new Date(0));
        Storage.incrInterruptions();
        expect(Storage.getCounter(Storage.TODAY_INTERRUPTION)).toBe(1);
    });  
});
