import { 
  formatDate,
  taskComplete,
  isSameWeek, 
  updateLocalStorage 
} from '../scripts/taskButton';

test('checks updateLocalStorage', () => {
  let storage = taskComplete(true, new Date(2021, 1, 18));
  updateLocalStorage(2, 2);
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("2");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
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
  let storage = taskComplete(true, new Date(2021, 1, 18)); // 2-18-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("1");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("1");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks local storage 1', () => { // test different day, different week
  let storage = taskComplete(true, new Date(2021, 1, 10)); // 2-10-2021
  storage = taskComplete(false, new Date(2021, 1, 16)); // 2-16-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("1");
  expect(storage.getItem("today")).toStrictEqual("02/16/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021"); // should update to new week start
});

test('checks local storage 2', () => { // test different day, same week
  let storage = taskComplete(true, new Date(2021, 1, 17)); // 2-17-2021
  storage = taskComplete(false, new Date(2021, 1, 18)); // 2-18-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("1");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks local storage 3', () => { // test same day, same week
  let storage = taskComplete(true, new Date(2021, 1, 18)); // 2-18-2021
  storage = taskComplete(false, new Date(2021, 1, 18)); // 2-18-2021
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("2");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});

test('checks isSameWeek 0', () => { // is same week
  taskComplete(true, new Date(2021, 1, 18));
  expect(isSameWeek(new Date(2021, 1, 21))).toStrictEqual(true);
});

test('checks isSameWeek 1', () => { // is not same week
  taskComplete(true, new Date(2021, 1, 18));
  expect(isSameWeek(new Date(2021, 1, 22))).toStrictEqual(false);
});

test('checks updateLocalStorage', () => {
  let storage = taskComplete(true, new Date(2021, 1, 18));
  updateLocalStorage(2, 2);
  expect(storage.getItem("total-task-count")).toStrictEqual("2");
  expect(storage.getItem("today-task-count")).toStrictEqual("2");
  expect(storage.getItem("week-task-count")).toStrictEqual("2");
  expect(storage.getItem("today")).toStrictEqual("02/18/2021");
  expect(storage.getItem("week-start")).toStrictEqual("02/15/2021");
});