import * as Constants from '../scripts/constants';
import { 
  formatDate,
  taskComplete,
  isSameWeek, 
  resetWeekArray,
  updateLocalStorage 
} from '../scripts/tasks';

beforeEach(() => {
  window.localStorage.clear();
});

test('checks format date', () => {
  let check = new Date();
  let dd = String(check.getDate()).padStart(2, "0"); // date
  let mm = String(check.getMonth() + 1).padStart(2, "0"); // month
  let yyyy = check.getFullYear(); // year
  let check_format = mm + "/" + dd + "/" + yyyy;
  
  expect(formatDate(check)).toStrictEqual(check_format);
});

test('checks local storage 0', () => { // test empty storage
  taskComplete(new Date(2021, 1, 18)); // 2-18-2021

  expect(window.localStorage.getItem(Constants.TOTAL_TASK_ID)).toStrictEqual("1");
  expect(window.localStorage.getItem(Constants.TODAY_TASK_ID)).toStrictEqual("1");
  expect(window.localStorage.getItem(Constants.WEEK_TASK_ID)).toStrictEqual("1");
  expect(window.localStorage.getItem(Constants.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
  expect(window.localStorage.getItem(Constants.WEEK_START_ID)).toStrictEqual("02/15/2021");
});

test('checks local storage 1', () => { // test different week
  taskComplete(new Date(2021, 1, 10)); // 2-10-2021
  taskComplete(new Date(2021, 1, 16)); // 2-16-2021

  expect(window.localStorage.getItem(Constants.TOTAL_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_TASK_ID)).toStrictEqual("1");
  expect(window.localStorage.getItem(Constants.WEEK_TASK_ID)).toStrictEqual("1");
  expect(window.localStorage.getItem(Constants.TODAY_DATE_ID)).toStrictEqual("02/16/2021");
  expect(window.localStorage.getItem(Constants.WEEK_START_ID)).toStrictEqual("02/15/2021"); // should update to new week start
});

test('checks local storage 2', () => { // test different day, same week
  taskComplete(new Date(2021, 1, 17)); // 2-17-2021
  taskComplete(new Date(2021, 1, 18)); // 2-18-2021

  expect(window.localStorage.getItem(Constants.TOTAL_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_TASK_ID)).toStrictEqual("1");
  expect(window.localStorage.getItem(Constants.WEEK_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
  expect(window.localStorage.getItem(Constants.WEEK_START_ID)).toStrictEqual("02/15/2021");
});

test('checks local storage 3', () => { // test same day, same week
  taskComplete(new Date(2021, 1, 18)); // 2-18-2021
  taskComplete(new Date(2021, 1, 18)); // 2-18-2021

  expect(window.localStorage.getItem(Constants.TOTAL_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.WEEK_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
  expect(window.localStorage.getItem(Constants.WEEK_START_ID)).toStrictEqual("02/15/2021");
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

  expect(window.localStorage.getItem(Constants.WEEK_HISTORY)).toStrictEqual(weekHistory);
});

test('checks updateLocalStorage', () => {
  taskComplete(new Date(2021, 1, 18));
  updateLocalStorage(2, 2, 6);

  expect(window.localStorage.getItem(Constants.TOTAL_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.WEEK_TASK_ID)).toStrictEqual("2");
  expect(window.localStorage.getItem(Constants.TODAY_DATE_ID)).toStrictEqual("02/18/2021");
  expect(window.localStorage.getItem(Constants.WEEK_START_ID)).toStrictEqual("02/15/2021");
});
