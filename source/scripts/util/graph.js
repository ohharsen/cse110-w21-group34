/* global zingchart */
import { isA11yEnabled } from '../accessibility.js';
import { ZEROS } from './storage.js';

/* Graph Constants */
let X_LABELS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
let X_LABEL = 'Days';
let Y_LABEL = 'Pomos Completed';
const TEXT_FONT = 'Roboto';
const TEXT_FONT_SIZE = '12px';
const TEXT_FONT_SIZE_ACCESSIBILITY = '15px';
const TEXT_FONT_WEIGHT = 'normal';
const TEXT_FONT_WEIGHT_ACCESSIBILITY = 'bold';
const BAR_COLOR = '#eb4000';
const BAR_COLOR_ACCESSIBILITY = '#B50014';
const ANIMATION_SPEED = 275;
const Y_MIN_SCALING = 3;
const Y_MAX_STEP = 6;
const ONE = 1;
const TEST_PROCESS = 'test';

// /* All instanbul ignored code is tested in Cypress or uses Canvas */

// /**
//  * Function to find max value in weekly data
//  * @param {Number[]} data - An array of weekly data of pomos completed
//  * @return max - the max value in the weekly data
//  */
function findMax (data) {
  let max = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
}

export function changeLanguageAxis (localeXLabels, localeXLabel, localeYLabel) {
  X_LABELS = localeXLabels;
  X_LABEL = localeXLabel;
  Y_LABEL = localeYLabel;
}

// /* istanbul ignore next */
// /**
//  * Displays a graph showing the weekly statistics of pomos completed
//  * @param {Number[]} data - An array of weekly data of pomos completed
//  */
export function displayGraph (data = ZEROS) {
  if ((typeof process === 'object' && process.env.NODE_ENV === TEST_PROCESS)) return;

  // set font and bar color appropriately when accessibility is on
  const barColor = (isA11yEnabled()) ? BAR_COLOR_ACCESSIBILITY : BAR_COLOR;
  const fontSize = (isA11yEnabled()) ? TEXT_FONT_SIZE_ACCESSIBILITY : TEXT_FONT_SIZE;
  const fontWeight = (isA11yEnabled()) ? TEXT_FONT_WEIGHT_ACCESSIBILITY : TEXT_FONT_WEIGHT;
  let maxVal = findMax(data);
  let step = null;

  // when values are small, scales the graph appropriately
  if (maxVal < Y_MIN_SCALING) {
    maxVal = Y_MIN_SCALING;
  }
  if (maxVal < Y_MAX_STEP) {
    step = ONE;
  }

  const myConfig = {
    type: 'bar',
    // tooltip is the number when users scrolls over bars
    tooltip: {
      'font-family': TEXT_FONT,
      'font-size': fontSize,
      'font-weight': fontWeight
    },
    scaleX: {
      label: {
        text: X_LABEL,
        'font-family': TEXT_FONT,
        'font-size': fontSize,
        'font-weight': fontWeight
      },
      labels: X_LABELS
    },
    scaleY: {
      label: {
        text: Y_LABEL,
        'font-family': TEXT_FONT,
        'font-size': fontSize,
        'font-weight': fontWeight
      },
      step: step,
      'max-value': maxVal // for scaling y-axis
    },
    plotarea: {
      margin: 'dynamic' // for the graph to fit the div
    },
    plot: {
      // for the bar animations
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: ANIMATION_SPEED
      }
    },
    series: [
      {
        values: data, // the data to populate graph
        'background-color': barColor, // Bar fill color
        alpha: ONE // for a solid bar color
      }
    ]
  };
  zingchart.render({
    id: 'graph',
    data: myConfig,
    height: '100%',
    width: '100%'
  });
}
