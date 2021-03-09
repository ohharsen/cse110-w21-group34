const X_LABELS = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
const Y_LABEL = 'Pomodoros Completed';
const INITIAL_Y_AXES = [0, 1, 2, 3];
const TEXT_FONT = '12px Roboto';
const BAR_COLOR = '#eb4000';
const BAR_WIDTH = 20;
const BAR_PADDING = 12;
const BAR_LEFT_MARGIN = 24;
const TEXT_HEIGHT = 14;
const TOP_PADDING = 16;
const RIGHT_PADDING = 16;
const BOTTOM_PADDING = 32;
const LEFT_PADDING = 48;

/**
 * Draws a graph to the given canvas element with the given data points.
 * @param {HTMLCanvasElement} canvas Target canvas
 * @param {number[]} data An array
 */
export function drawGraph(canvas, data = [0, 0, 0, 0, 0, 0, 0]) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const axes = calculateAxes(data);
    drawAxes(ctx, canvas.height, canvas.width, axes);
    drawBars(ctx, canvas.height, data, axes);
    ctx.save();
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} canvasHeight 
 * @param {number} canvasWidth 
 * @param {number[]} axes 
 */
function drawAxes(ctx, canvasHeight, canvasWidth, axes) {
    const maxHeight = canvasHeight - BOTTOM_PADDING;
    const maxWidth = canvasWidth - RIGHT_PADDING;

    // Draw y-axes
    ctx.font = TEXT_FONT;
    ctx.textAlign = 'center';
    for (const [i, axis] of axes.entries()) {
      const x = LEFT_PADDING;
      const y = TOP_PADDING + maxHeight - Math.round(maxHeight * (i / (axes.length - 1)));
      drawLine(ctx, x, y, maxWidth, y);
      ctx.fillText(axis, x - 16, y + 4);
    }
    
    // Draw y-label
    ctx.save();
    ctx.translate(16, Math.round((TOP_PADDING + maxHeight) / 2));
    ctx.rotate(-Math.PI/2);
    ctx.fillText(Y_LABEL, 0, 0);
    ctx.restore();
    
    // Draw x-labels
    for (const [i, label] of X_LABELS.entries()) {
        const x = LEFT_PADDING + BAR_LEFT_MARGIN + i * (BAR_WIDTH + BAR_PADDING);
        const y = TOP_PADDING + maxHeight + 8 + (TEXT_HEIGHT / 2);
        ctx.fillText(label, x, y);
    }
    drawLine(ctx, LEFT_PADDING, 0, LEFT_PADDING, TOP_PADDING + maxHeight);
}

/**
 * Calculate and return 4 y-axes used in the graph. The first axis will always
 * be 0.
 * 
 * If max data is:
 *      0  - 3  => dont change max
 *      4  - 10 => round max up 1
 *      11 - 30 => round max up 2
 * spacing = max axis / 4
 * @param {number[]} data The weekly data to scale the axes by.
 * @return {number[]} The axes in array form, from first axis to last axis.
 */
function calculateAxes (data) {
  
  // distribute the spacing
  const axes = INITIAL_Y_AXES;
  
  // Calculating current max pomo cycles within week
  let max = Math.max(...data);
  
  // Checking max value to determine axes values
  if (max < 4) {
    return axes;
  } else if (max < 11) {
    max += 1;
  } else {
    max += 2;
  }
  
  // Setting axes values and rounding to one decimal place
  axes[1] = (max / 3).toFixed(1);
  axes[2] = (2 * max / 3).toFixed(1);
  axes[3] = max;
  
  return axes;
}

/**
 * Draws bars for each datapoint in data, relative to the highest valued
 * axis given in axes.
 * @param {CanvasRenderingContext2D} ctx The canvas' 2d rendering context
 * @param {number} canvasHeight The canvas' height
 * @param {number[]} data x-data
 * @param {number[]} axes y-axis values
 */
function drawBars(ctx, canvasHeight, data, axes) {
    const maxAxis = Math.max(...axes);
    const maxHeight = canvasHeight - BOTTOM_PADDING;
    for (const [i, d] of data.entries()) {
        const barHeight = Math.round(maxHeight * (d / maxAxis));
        if (barHeight > 0) {
            const x = LEFT_PADDING + BAR_LEFT_MARGIN + i * (BAR_WIDTH + BAR_PADDING);
            const y = TOP_PADDING + maxHeight - barHeight;
            drawBar(ctx, x, y, BAR_WIDTH, barHeight, BAR_COLOR);
        }
    }
}

/**
 * Draws a bar centered at (x, y) with w width (horizontal) and h height
 * (vertical), using the given canvas' context.
 * Default color is black (#000000).
 * @param {CanvasRenderingContext2D} ctx Target canvas' context
 * @param {number} x horizontal position of upper-left corner
 * @param {number} y vertical position of upper-left corner
 * @param {number} w width
 * @param {number} h height
 * @param {?string} color hex color (e.g. #fafefc)
 */
function drawBar(ctx, x, y, w, h, color = '#000000') {
    ctx.fillStyle = color;
    ctx.fillRect(x - Math.round(w / 2), y, w, h);
}

/**
 * Draws a line from (x1, y1) to (x2, y2) on the given canvas' context.
 * @param {CanvasRenderingContext2D} ctx Target canvas' context
 * @param {number} x1 horizontal position of start point
 * @param {number} y1 vertical position of start point
 * @param {number} x2 horizontal position of end point
 * @param {number} y2 vertical position of end point
 */
function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
