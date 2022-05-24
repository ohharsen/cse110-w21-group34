var en_us = {
  pomodoro: "Pomodoro",
  shortBreak: "Short Break",
  longBreak: "Long Break",
  begin: "Begin",
  interruption: "This will count as an interruption.<br> Are you sure?",
  reset: "Reset",
  yes: "Yes",
  no: "No",
  completion: 'Complete Task: <span id="task-pomo-counter">0</span> Pomos',
  settingsIcon: "./images/settings.png",
  statsIcon: "./images/test.png",
  settingsHeader: "Settings",
  settingsWhatIs: "What is a Pomodoro?",
  explanationText:
    "The Pomodoro Cycle is a tool for encouraging productivity. Each cycle allocates 25 minutes of time to work followed by a 5 minute rest period. After your 4th pomo, you'll earn an extended 15 minute break!",
  tutorialHeader: "How does this app work?",
  tutorialText:
    'Select "<b>Begin</b>" to start a Pomodoro and "<b>Reset</b>" to end early. The text headers and ring color will indicate the <span id="work-text">work</span> and <span id="break-text">break</span> stages of a cycle. Select "<b>Complete Task</b>" when appropriate and "<b>Statistics</b>" to browse your performance.',
  accessibilityHeader: "Accessibility Options",
  settingsColor: "Colorblindness",
  settingsKeystroke: "Keystroke Access",
  statsHeader: "User Statistics",
  todayHeader: "Today",
  pomoCycle: "Pomos cycles:",
  pomoCycleUnits: '<span id="today-pomodoros">____</span> po.',
  todayInterruption: "Interruptions:",
  totalTasks: "Total Tasks:",
  totalTasksUnits: '<span id="today-tasks">____</span> tasks',
  todayTasks: "tasks",
  totalHeader: "Totals",
  totalPomoCycleUnits: '<span id="total-pomodoros">____</span> po.',
  avgInterruptions: "Avg. Interruptions:",
  avgInterruptionsUnits: '<span id="total-interruptions">____</span> per po.',
  bestDay: "Best Day:",
  bestDayUnits:
    '<span id="total-best-pomo">____</span> po. |<span id="total-best-time">____</span> min.',
  totalTotalTasksUnits: '<span id="total-tasks">____</span> tasks',
  weeklyHeader: "Weekly Overview",
  languageDropdownHeader: "Change Language",
  dropdownBtn: "Language",
  dropdownEn: "English",
  dropdownKo: "Korean",
};

var ko = {
  pomodoro: "뽀모도로",
  shortBreak: "짧은 휴식",
  longBreak: "긴 휴식",
  begin: "시작",
  interruption: "이것은 잠시 중단으로 간주됩니다.<br> 계속하시겠습니까?",
  reset: "재설정",
  yes: "예",
  no: "아니요",
  completion: '작업 완료: <span id="task-pomo-counter">0</span> 뽀모스',
  settingsIcon: "./images/settings_kr.png",
  statsIcon: "./images/test_kr.png",
  settingsHeader: "설정",
  settingsWhatIs: "뽀모도로가 무엇인가요?",
  explanationText:
    "뽀모도로 사이클은 생산성을 향상시키는 도구입니다. 각 사이클은 25분의 작업 시간과 5분의 휴식 시간을 할당합니다. 4번째 포모 후에는 15분의 휴식 시간이 연장됩니다!",
  tutorialHeader: "이 앱의 작동법",
  tutorialText:
    '뽀모도로를 시작하려면 "<b>시작</b>"을 선택하고 일찍 종료하려면 "<b>재설정</b>" 을 선택하세요. 텍스트 헤더와 링 색상은 사이클의 <span id="work-text">작업</span> 및 <span id="break-text">휴식</span> 단계를 나타냅니다. 적절하게 "<b>작업 완료</b>"를 선택하고 현재 성과를 찾아보려면 "<b>통계</b>"를 선택하십시오.',
  accessibilityHeader: "접근성 옵션",
  settingsColor: "색맹 옵션",
  settingsKeystroke: "키 입력 옵션",
  statsHeader: "사용자 통계",
  todayHeader: "오늘",
  pomoCycle: "뽀모스 주기:",
  pomoCycleUnits: '<span id="today-pomodoros">____</span> 뽀.',
  todayInterruption: "잠시 중단 횟수:",
  totalTasks: "총 작업 횟수:",
  totalTasksUnits: '<span id="today-tasks">____</span> 작업',
  todayTasks: "작업 횟수",
  totalHeader: "합계",
  totalPomoCycleUnits: '<span id="total-pomodoros">____</span> 뽀.',
  avgInterruptions: "평균 잠시 중단 횟수:",
  avgInterruptionsUnits: '뽀당 <span id="total-interruptions">____</span>',
  bestDay: "최고의 날:",
  bestDayUnits:
    '<span id="total-best-pomo">____</span> 뽀. |<span id="total-best-time">____</span> 분.',
  totalTotalTasksUnits: '<span id="total-tasks">____</span> 작업',
  weeklyHeader: "주간 개요",
  dropdownHeader: "언어 변경",
  dropdownBtn: "언어",
  dropdownEn: "영어",
  dropdownKo: "한국어",
};

const workIndicator = document.getElementById("work-indicator");
const shortBreakIndicator = document.getElementById("short-break-indicator");
const longBreakIndicator = document.getElementById("long-break-indicator");
const startStopButton = document.getElementById("start-stop-button");
const promptText = document.getElementById("prompt-text");
const resetYes = document.getElementById("reset-yes-button");
const resetNo = document.getElementById("reset-no-button");
const taskBtn = document.getElementById("task");
const settingsHeader = document.getElementById("settings-header");
const settingsWhatIs = document.getElementById("settings-what-is");
const explanationText = document.getElementById("explanation-text");
const tutorialHeader = document.getElementById("tutorial-header");
const tutorialText = document.getElementById("tutorial-text");
const accessibilityHeader = document.getElementById("accessibility-header");
const settingsColor = document.getElementById("settings-color");
const settingsKeystroke = document.getElementById("settings-keystroke");
const statsHeader = document.getElementById("stats-header");
const statTodayHeader = document.getElementById("stat-today-header");
const statPomoCycle = document.getElementById("stat-pomo-cycle");
const statPomoCycleUnits = document.getElementById("stat-pomo-cycle-units");
const statInterruption = document.getElementById("stat-interruption");
const statTotalTasks = document.getElementById("stat-total-tasks");
const statTotalTasksUnits = document.getElementById("stat-total-tasks-units");
const statTotalHeader = document.getElementById("stat-total-header");
const statTotalPomoCycleUnits = document.getElementById("stat-total-pomo-cycle-units");
const statTotalPomoCycle = document.getElementById("stat-total-pomo-cycle");
const statAvgInterruption = document.getElementById("stat-avg-interruptions");
const statAvgInterruptionUnits = document.getElementById("stat-avg-interruptions-units");
const statBestDay = document.getElementById("stat-best-day");
const statBestDayUnits = document.getElementById("stat-best-day-units");
const statTotalTasksTotalUnits = document.getElementById("stat-total-tasks-total-units");
const statTotalTasksTotal = document.getElementById("stat-total-tasks-total");
const statWeeklyHeader = document.getElementById("stat-weekly-header");
const settingsImg = document.getElementById("settings-img");
const statsImg = document.getElementById("stats-img");
const languageHeader = document.getElementById("language-header");
const dropdown = document.getElementById("dropdown");
const dropdownEnglish = document.getElementById("dropdown-en");
const dropdownKorean = document.getElementById("dropdown-ko");

//variable that controls which language is displayed
export var lang = en_us;
//get stored language, if it exists populate page with appropriate language
let storedLanguage = localStorage.getItem("language")
switch(storedLanguage){
    case "en_us":
        lang = en_us;
        populateLanguage();
        break;
    case "ko":
        lang = ko;
        populateLanguage();
        break;
    default:
        break;
}

/**
 * functions that control what language to swap to
 */
function setLanguageEn() {
  lang = en_us;
  localStorage.setItem("language", "en_us");
  populateLanguage();
}
function setLanguageKo() {
  lang = ko;
  localStorage.setItem("language", "ko");
  populateLanguage();
}
dropdownEnglish.onclick = setLanguageEn;
dropdownKorean.onclick = setLanguageKo;

/**
 * populates all the html elements with the correct strings (based on language)
 */
function populateLanguage() {
  workIndicator.innerHTML = lang.pomodoro;
  shortBreakIndicator.innerHTML = lang.shortBreak;
  longBreakIndicator.innerHTML = lang.longBreak;
  startStopButton.innerHTML = lang.begin;
  promptText.innerHTML = lang.interruption;
  resetYes.innerHTML = lang.yes;
  resetNo.innerHTML = lang.no;
  taskBtn.innerHTML = lang.completion;
  settingsHeader.innerHTML = lang.settingsHeader;
  settingsWhatIs.innerHTML = lang.settingsWhatIs;
  explanationText.innerHTML = lang.explanationText;
  tutorialHeader.innerHTML = lang.tutorialHeader;
  tutorialText.innerHTML = lang.tutorialText;
  accessibilityHeader.innerHTML = lang.accessibilityHeader;
  settingsColor.innerHTML = lang.settingsColor;
  settingsKeystroke.innerHTML = lang.settingsKeystroke;
  statsHeader.innerHTML = lang.statsHeader;
  statTodayHeader.innerHTML = lang.todayHeader;
  statPomoCycle.innerHTML = lang.pomoCycle;
  statPomoCycleUnits.innerHTML = lang.pomoCycleUnits;
  statInterruption.innerHTML = lang.todayInterruption;
  statTotalTasks.innerHTML = lang.totalTasks;
  statTotalTasksUnits.innerHTML = lang.totalTasksUnits;
  statTotalHeader.innerHTML = lang.totalHeader;
  statTotalPomoCycleUnits.innerHTML = lang.totalPomoCycleUnits;
  statTotalPomoCycle.innerHTML = lang.pomoCycle;
  statAvgInterruption.innerHTML = lang.avgInterruptions;
  statAvgInterruptionUnits.innerHTML = lang.avgInterruptionsUnits;
  statBestDay.innerHTML = lang.bestDay;
  statBestDayUnits.innerHTML = lang.bestDayUnits;
  statTotalTasksTotalUnits.innerHTML = lang.totalTotalTasksUnits;
  statTotalTasksTotal.innerHTML = lang.totalTasks;
  statWeeklyHeader.innerHTML = lang.weeklyHeader;
  settingsImg.src = lang.settingsIcon;
  statsImg.src = lang.statsIcon;
  languageHeader.innerHTML = lang.dropdownHeader;
  dropdown.innerHTML = lang.dropdownBtn;
  dropdownEnglish.innerHTML = lang.dropdownEn;
  dropdownKorean.innerHTML = lang.dropdownKo;
}
