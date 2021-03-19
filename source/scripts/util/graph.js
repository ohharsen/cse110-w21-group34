import { isA11yEnabled } from '../accessibility.js';
import { ZEROS } from './storage.js' 

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
const OBJECT_TYPE = 'object';
const TEST_PROCESS = 'test';
const CONTEXT_2D = '2d';

/* All instanbul ignored code is tested in Cypress or uses Canvas */

/* istanbul ignore next */
/**
 * Draws a graph to the given canvas element with the given data points
 * @param {HTMLCanvasElement} canvas - Target canvas
 * @param {Number[]} data - An array
 */
export function drawGraph (canvas, data = ZEROS) {
  if (!canvas || (typeof process === OBJECT_TYPE && process.env.NODE_ENV === TEST_PROCESS)) return;

  const ctx = canvas.getContext(CONTEXT_2D);
  const axes = calculateAxes(data);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxes(ctx, canvas.height, canvas.width, axes);
  drawBars(ctx, canvas.height, data, axes);
  ctx.save();
}

/* istanbul ignore next */
/**
 * Draws axes for the graph 
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context 
 * @param {Number} canvasHeight - The canvas height
 * @param {Number} canvasWidth - The canvas width
 * @param {Number[]} axes - y-axis values
 */
function drawAxes (ctx, canvasHeight, canvasWidth, axes) {
  const maxHeight = canvasHeight - BOTTOM_PADDING;
  const maxWidth = canvasWidth - RIGHT_PADDING;

  // Draw y-axes
  // If accessibibility mode is on we use larger font
  ctx.font = (isA11yEnabled()) ? TEXT_FONT_ACCESSIBILITY : TEXT_FONT;
  ctx.textAlign = TEXT_ALIGN_CENTER;
  for (const [i, axis] of axes.entries()) {
    const x = LEFT_PADDING;
    const y = TOP_PADDING + maxHeight - Math.round(maxHeight * (i / (axes.length - 1)));
    drawLine(ctx, x, y, maxWidth, y);
    ctx.fillText(axis, x - FILL_TEXT_X_PAD, y + FILL_TEXT_Y_PAD);
  }

  // Draw y-label
  ctx.save();
  ctx.translate(16, Math.round((TOP_PADDING + maxHeight) / TWO));
  ctx.rotate(-Math.PI / TWO);
  ctx.fillText(Y_LABEL, 0, 0);
  ctx.restore();

  // Draw x-labels
  for (const [i, label] of X_LABELS.entries()) {
    const x = LEFT_PADDING + BAR_LEFT_MARGIN + i * (BAR_WIDTH + BAR_PADDING);
    const y = TOP_PADDING + maxHeight + X_LABEL_HEIGHT_PAD + (TEXT_HEIGHT / TWO);
    ctx.fillText(label, x, y);
  }
  drawLine(ctx, LEFT_PADDING, 0, LEFT_PADDING, TOP_PADDING + maxHeight);
}

/**
 * Calculates and returns 4 y-axes used in the graph. The first axis will always
 * be 0
 *
 * If max data is:
 *      0  - 3  => dont change max
 *      4  - 10 => round max up 1
 *      11 - 30 => round max up 2
 * spacing = max axis / 4
 * @summary Calculates y-axis marks
 * @param {Number[]} data - The weekly data to scale the axes by
 * @returns {Number[]} - The axes in array form, from first axis to last axis
 */
export function calculateAxes (data) {
  // distribute the spacing and use slice to copy array
  const axes = INITIAL_Y_AXES.slice();

  // Calculating current max pomo cycles within week
  let max = Math.max(...data);

  // Checking max value to determine new max with forced minimum spacing
  // between max value and highest y axis
  if (max < Y_MIN_SPACING) return axes;
  if (max >= Y_MAX_SPACING) max++;
  
  max++;

  // making sure max is divisible by 3 to not have decimals in y axis splits
  while (max % Y_MIN_SPACING !== 0) {
    max++;
  }

  // Setting axes values and rounding to one decimal place
  let axisIndex = 1;
  axes[axisIndex++] = max / Y_MIN_SPACING;
  axes[axisIndex++] = TWO * max / Y_MIN_SPACING;
  axes[axisIndex] = max;

  return axes;
}

/* istanbul ignore next */
/**
 * Draws bars for each datapoint in data, relative to the highest valued
 * axis given in axes
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} canvasHeight - The canvas height
 * @param {Number[]} data - x-data
 * @param {Number[]} axes - y-axis values
 */
function drawBars (ctx, canvasHeight, data, axes) {
  const maxAxis = Math.max(...axes);
  const maxHeight = canvasHeight - BOTTOM_PADDING;
  for (const [i, d] of data.entries()) {
    const barHeight = Math.round(maxHeight * (d / maxAxis));
    if (barHeight > 0) {
      // If accessibibility mode is on we use darker shade of red for rectangle
      const barColor = (isA11yEnabled()) ? BAR_COLOR_ACCESSIBILITY : BAR_COLOR;
      const x = LEFT_PADDING + BAR_LEFT_MARGIN + i * (BAR_WIDTH + BAR_PADDING);
      const y = TOP_PADDING + maxHeight - barHeight;
      drawBar(ctx, x, y, BAR_WIDTH, barHeight, barColor);
    }
  }
}

/* istanbul ignore next */
/**
 * Draws a bar centered at (x, y) with w width (horizontal) and h height
 * (vertical), using the given canvas' context
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} x - Horizontal position of upper-left corner
 * @param {Number} y - Vertical position of upper-left corner
 * @param {Number} w - Width
 * @param {Number} h - Height
 * @param {string} color - Hex color (e.g. #fafefc)
 */
function drawBar (ctx, x, y, w, h, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x - Math.round(w / TWO), y, w, h);
  ctx.restore();
}

/* istanbul ignore next */
/**
 * Draws a line from (x1, y1) to (x2, y2) on the given canvas' context
 * @param {CanvasRenderingContext2D} ctx - The canvas' 2d rendering context
 * @param {Number} x1 - Horizontal position of start point
 * @param {Number} y1 - Vertical position of start point
 * @param {Number} x2 - Horizontal position of end point
 * @param {Number} y2 - Vertical position of end point
 */
function drawLine (ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
