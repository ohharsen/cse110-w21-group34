import { isA11yEnabled } from '../accessibility.js';
import { ZEROS } from './storage.js';

/* Graph Constants */
const X_LABELS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const Y_LABEL = 'Pomos Completed';
const INITIAL_Y_AXES = [0, 1, 2, 3];
const TEXT_ALIGN_CENTER = 'center';
const TEXT_FONT = '12px Roboto';
const TEXT_FONT_ACCESSIBILITY = 'bold 15px Roboto';
const BAR_COLOR = '#eb4000';
const BAR_COLOR_ACCESSIBILITY = '#B50014';
const BAR_WIDTH = 20;
const BAR_PADDING = 12;
const BAR_LEFT_MARGIN = 24;
const TEXT_HEIGHT = 14;
const TOP_PADDING = 16;
const RIGHT_PADDING = 16;
const BOTTOM_PADDING = 32;
const LEFT_PADDING = 48;

/* Drawing Constants */
const FILL_TEXT_X_PAD = 16;
const FILL_TEXT_Y_PAD = 4;
const X_LABEL_HEIGHT_PAD = 8;
const Y_MIN_SPACING = 3;
const Y_MAX_SPACING = 11;
const TWO = 2;

/* Other Constants */
const TEST_PROCESS = 'test';
const CONTEXT_2D = '2d';


// /* All instanbul ignored code is tested in Cypress or uses Canvas */

// /* istanbul ignore next */
// /**
//  * Draws a graph to the given canvas element with the given data points
//  * @param {HTMLCanvasElement} canvas - Target canvas
//  * @param {Number[]} data - An array
//  */

export function drawGraph (data = ZEROS) {
  console.log("graph");
  // if (!canvas || (typeof process === 'object' && process.env.NODE_ENV === TEST_PROCESS)) return;
  //data = [5, 10, 7, 1, 9, 0, 11]
  //data = [0, 0, 0, 1, 0, 0, 1]

  let myConfig = {
    type: 'bar',
    scaleX: {
      label: { text: 'Days' },
      labels: X_LABELS
    },
    scaleY: {
      label: { text: Y_LABEL }
    },
    
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 275,
      }
    },
    series: [
      {
        values: data,
        'background-color': BAR_COLOR, // Bar fill color 
        alpha: 1 //for a solid bar color
      }
    ]
  };
  zingchart.render({
    id: "graph",
    data: myConfig,
    height: '100%',
    width: '100%'
  });
}

