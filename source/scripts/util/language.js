import { changeLanguageAxis } from './graph.js';

const enUS = {
  pomobearHeader: 'Pomobear',

  breakMsg: 'Take a break!',
  pomodoro: 'Pomodoro',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',

  begin: 'Begin',
  reset: 'Reset',
  end: 'End Session',
  breakMessages: [
    'Stand up!',
    'Relax your mind',
    'Rest!',
    'Breathe',
    'Take a break!'
  ],

  interruption: 'This will count as an interruption.<br> Are you sure?',
  interruption2:
    'End this pomo session? <br> This will not count as an interruption.',
  yes: 'Yes',
  no: 'No',
  completion: 'Complete Task: <span id="task-pomo-counter">0</span> Pomos',

  settingsHeader: 'Settings',
  personalizationHeader: 'Personalization Options',
  accessibilityHeader: 'Accessibility Options',
  settingsColor: 'Colorblindness',
  settingsKeystroke: 'Keystroke Access',
  settingsAuto: 'Auto-Start Timer',
  settingsTab: 'Tab Timer Visibility',

  settingsBackgrounds: 'Backgrounds',
  settingsLanguage: 'Languages',
  background1: 'Original',
  background2: 'Desert',
  background3: 'Lake',
  dropdownEn: 'English',
  dropdownKo: 'Korean',
  dropdownEs: 'Spanish',

  statsHeader: 'User Statistics',
  todayHeader: 'Today',
  pomoCycle: 'Pomos cycles:',
  pomoCycleUnits: '<span id="today-pomodoros">____</span> po.',
  todayInterruption: 'Interruptions:',
  totalTasks: 'Total Tasks:',
  totalTasksUnits: '<span id="today-tasks">____</span> tasks',
  todayTasks: 'tasks',
  totalHeader: 'Totals',
  totalPomoCycleUnits: '<span id="total-pomodoros">____</span> po.',
  avgInterruptions: 'Avg. Interruptions:',
  avgInterruptionsUnits: '<span id="total-interruptions">____</span> per po.',
  bestDay: 'Best Day:',
  bestDayUnits:
    '<span id="total-best-pomo">____</span> po. |<span id="total-best-time">____</span> min.',
  totalTotalTasksUnits: '<span id="total-tasks">____</span> tasks',
  weeklyHeader: 'Weekly Overview',

  weekDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
  day: 'Days',
  pomosCompleted: 'Pomos Completed'
};

const ko = {
  pomobearHeader: '뽀모곰',

  breakMsg: '휴식을 취하세요!',
  pomodoro: '뽀모도로',
  shortBreak: '짧은 휴식',
  longBreak: '긴 휴식',

  begin: '시작',
  reset: '재설정',
  end: '마무리',
  breakMessages: ['일어서!', '차분하자!', '휴식!', '들숨 날숨', '화이팅!'],

  interruption: '이것은 잠시 중단으로 간주됩니다.<br> 계속하시겠습니까?',
  interruption2:
    '이 세션을 종료하시겠습니까? <br> 이것은 중단으로 간주되지 않습니다.',
  yes: '예',
  no: '아니요',
  completion: '작업 완료: <span id="task-pomo-counter">0</span> 뽀모스',

  settingsHeader: '설정',
  personalizationHeader: '개인화 옵션',
  accessibilityHeader: '접근성 옵션',
  settingsColor: '색맹 옵션',
  settingsKeystroke: '키 입력 옵션',
  settingsAuto: '타이머 자동 시작',
  settingsTab: '탭 타이머 가시성',

  settingsBackgrounds: '배경',
  settingsLanguage: '언어',
  background1: '기본',
  background2: '사막',
  background3: '호수',
  dropdownEn: '영어',
  dropdownKo: '한국어',
  dropdownEs: '스페인어',

  statsHeader: '사용자 통계',
  todayHeader: '오늘',
  pomoCycle: '뽀모스 주기:',
  pomoCycleUnits: '<span id="today-pomodoros">____</span> 뽀.',
  todayInterruption: '잠시 중단 횟수:',
  totalTasks: '총 작업 횟수:',
  totalTasksUnits: '<span id="today-tasks">____</span> 작업',
  todayTasks: '작업 횟수',
  totalHeader: '합계',
  totalPomoCycleUnits: '<span id="total-pomodoros">____</span> 뽀.',
  avgInterruptions: '평균 잠시 중단 횟수:',
  avgInterruptionsUnits: '뽀당 <span id="total-interruptions">____</span>',
  bestDay: '최고의 날:',
  bestDayUnits:
    '<span id="total-best-pomo">____</span> 뽀. |<span id="total-best-time">____</span> 분.',
  totalTotalTasksUnits: '<span id="total-tasks">____</span> 작업',
  weeklyHeader: '주간 개요',

  weekDays: ['일', '월', '화', '수', '목', '금', '토'],
  day: '날',
  pomosCompleted: '끝난 뽀모'
};

const es = {
  pomobearHeader: 'Oso pomodoro',

  breakMsg: '¡Tómate un descanso!',
  pomodoro: 'Pomodoro',
  shortBreak: 'Corto Descanso',
  longBreak: 'Descanso largo',

  begin: 'Comenzar',
  reset: 'Reiniciar',
  end: 'Finalizar sesión',
  breakMessages: [
    '¡Ponerse de pie!',
    'Relaja tu mente',
    '¡Descansar!',
    'Respirar',
    '¡Tomar un descanso!'
  ],

  interruption: 'Esto contará como una interrupción. <br> ¿Estás seguro?',
  interruption2:
    '¿Finalizar esta sesión? <br> Esto no contará como una interrupción.',
  yes: 'Sí',
  no: 'No',
  completion: 'Tarea completa: <span id = "task-pomo-counter"> 0 </span> Pomos',

  settingsHeader: 'Configuración',
  personalizationHeader: 'Opciones de personalización',
  accessibilityHeader: 'Opciones de accesibilidad',
  settingsColor: 'Daltonismo',
  settingsKeystroke: 'Acceso mediante pulsación de tecla',
  settingsAuto: 'Temporizador de inicio automático',
  settingsTab: 'Visibilidad del temporizador',

  settingsBackgrounds: 'Fondo',
  settingsLanguage: 'Idioma',
  background1: 'Original',
  background2: 'Desierto',
  background3: 'Lago',
  dropdownEn: 'Inglés',
  dropdownKo: 'Coreano',
  dropdownEs: 'Español',

  statsHeader: 'Estadísticas de usuario',
  todayHeader: 'Hoy',
  pomoCycle: 'Pomos ciclos:',
  pomoCycleUnits: '<span id = "today-pomodoros"> ____ </span> po.',
  todayInterruption: 'Interrupciones:',
  totalTasks: 'Total de tareas:',
  totalTasksUnits: '<span id = "today-tasks"> ____ </span> tareas',
  todayTasks: 'Tareas',
  totalHeader: 'Totales',
  totalPomoCycleUnits: '<span id = "total-pomodoros"> ____ </span> po.',
  avgInterruptions: 'Promedio de interrupciones:',
  avgInterruptionsUnits:
    '<span id = "total-interruptions"> ____ </span> por po.',
  bestDay: 'Mejor día:',
  bestDayUnits:
    '<span id = "total-best-pomo"> ____ </span> después. | <span id = "total-best-time"> ____ </span> min. ',
  totalTotalTasksUnits: '<span id = "total-tasks"> ____ </span> tareas',
  weeklyHeader: 'Resumen semanal',

  weekDays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  day: 'día',
  pomosCompleted: 'pomo completado'
};

/**
 * title and break msg
 */
const pomoHeader = document.getElementById('pomobear-header');
const breakMsg = document.getElementById('break-message');

/**
 * text on top of timer
 */
const workIndicator = document.getElementById('work-indicator');
const shortBreakIndicator = document.getElementById('short-break-indicator');
const longBreakIndicator = document.getElementById('long-break-indicator');

/**
 * text on interrupt
 */
const startStopButton = document.getElementById('start-stop-button');
const promptText = document.getElementById('prompt-text');
const resetYes = document.getElementById('reset-yes-button');
const resetNo = document.getElementById('reset-no-button');

/**
 * text on completion
 */
const taskBtn = document.getElementById('task');

/**
 * settings menu
 */
const settingsHeader = document.getElementById('settings-header');
const personalizationHeader = document.getElementById('personalization-header');
const accessibilityHeader = document.getElementById('accessibility-header');
const settingsColor = document.getElementById('settings-color');
const settingsKeystroke = document.getElementById('settings-keystroke');
const settingsAuto = document.getElementById('settings-auto');
const settingsTab = document.getElementById('settings-tab');
const settingsBackgrounds = document.getElementById('settings-backgrounds');
const dropdownOriginal = document.getElementById('background_1');
const dropdownDesert = document.getElementById('background_2');
const dropdownLake = document.getElementById('background_3');
const settingsLanguage = document.getElementById('settings-languages');
export const languages = document.getElementById('languages');
const dropdownEnglish = document.getElementById('english');
const dropdownKorean = document.getElementById('korean');
const dropdownSpanish = document.getElementById('spanish');

/**
 * stat menu
 */
const statsHeader = document.getElementById('stats-header');
const statTodayHeader = document.getElementById('stat-today-header');
const statPomoCycle = document.getElementById('stat-pomo-cycle');
const statPomoCycleUnits = document.getElementById('stat-pomo-cycle-units');
const statInterruption = document.getElementById('stat-interruption');
const statTotalTasks = document.getElementById('stat-total-tasks');
const statTotalTasksUnits = document.getElementById('stat-total-tasks-units');
const statTotalHeader = document.getElementById('stat-total-header');
const statTotalPomoCycleUnits = document.getElementById(
  'stat-total-pomo-cycle-units'
);
const statTotalPomoCycle = document.getElementById('stat-total-pomo-cycle');
const statAvgInterruption = document.getElementById('stat-avg-interruptions');
const statAvgInterruptionUnits = document.getElementById(
  'total-interruptions-unit'
);
const statBestDay = document.getElementById('stat-best-day');
const statBestDayUnits = document.getElementById('stat-best-day-units');
const statTotalTasksTotalUnits = document.getElementById(
  'stat-total-tasks-total-units'
);
const statTotalTasksTotal = document.getElementById('stat-total-tasks-total');
const statWeeklyHeader = document.getElementById('stat-weekly-header');

/**
 * variable that controls which language is displayed
 */
export let lang = enUS;

/**
 * get stored language, if it exists populate page with appropriate language
 */
const storedLanguage = localStorage.getItem('language');
switch (storedLanguage) {
  case 'enUS':
    lang = enUS;
    populateLanguage();
    changeLanguageAxis(lang.weekDays, lang.day, lang.pomosCompleted);
    languages.value = dropdownEnglish.value;
    break;
  case 'ko':
    lang = ko;
    populateLanguage();
    languages.value = dropdownKorean.value;
    changeLanguageAxis(lang.weekDays, lang.day, lang.pomosCompleted);
    break;
  case 'es':
    lang = es;
    populateLanguage();
    languages.value = dropdownSpanish.value;
    changeLanguageAxis(lang.weekDays, lang.day, lang.pomosCompleted);
    break;
  default:
    break;
}

/**
 * functions that control what language to swap to
 */
function setLanguageEn () {
  lang = enUS;
  localStorage.setItem('language', 'enUS');
  populateLanguage();
  changeLanguageAxis(lang.weekDays, lang.day, lang.pomosCompleted);
}
function setLanguageKo () {
  lang = ko;
  localStorage.setItem('language', 'ko');
  populateLanguage();
  changeLanguageAxis(lang.weekDays, lang.day, lang.pomosCompleted);
}
function setLanguageEs () {
  lang = es;
  localStorage.setItem('language', 'es');
  populateLanguage();
  changeLanguageAxis(lang.weekDays, lang.day, lang.pomosCompleted);
}

export function changeLanguage () {
  if (this.value === 'enUS') {
    setLanguageEn();
  } else if (this.value === 'ko') {
    setLanguageKo();
  } else {
    setLanguageEs();
  }
}
/**
 * populates all the html elements with the correct strings (based on language)
 */
function populateLanguage () {
  pomoHeader.innerHTML = lang.pomobearHeader;
  breakMsg.innerHTML = lang.breakMsg;

  workIndicator.innerHTML = lang.pomodoro;
  shortBreakIndicator.innerHTML = lang.shortBreak;
  longBreakIndicator.innerHTML = lang.longBreak;

  startStopButton.innerHTML = lang.begin;
  promptText.innerHTML = lang.interruption;
  resetYes.innerHTML = lang.yes;
  resetNo.innerHTML = lang.no;

  taskBtn.innerHTML = lang.completion;

  settingsHeader.innerHTML = lang.settingsHeader;
  personalizationHeader.innerHTML = lang.personalizationHeader;
  accessibilityHeader.innerHTML = lang.accessibilityHeader;
  settingsColor.innerHTML = lang.settingsColor;
  settingsKeystroke.innerHTML = lang.settingsKeystroke;
  settingsAuto.innerHTML = lang.settingsAuto;
  settingsTab.innerHTML = lang.settingsTab;

  settingsBackgrounds.innerHTML = lang.settingsBackgrounds;
  dropdownOriginal.innerHTML = lang.background1;
  dropdownDesert.innerHTML = lang.background2;
  dropdownLake.innerHTML = lang.background3;
  settingsLanguage.innerHTML = lang.settingsLanguage;
  dropdownEnglish.innerHTML = lang.dropdownEn;
  dropdownKorean.innerHTML = lang.dropdownKo;
  dropdownSpanish.innerHTML = lang.dropdownEs;

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
}

window.addEventListener('DOMContentLoaded', function () {
  document.body.style.visibility = 'visible';
});
