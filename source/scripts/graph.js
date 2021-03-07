const BAR_WIDTH = 28;
const BAR_PADDING = 16;
const BAR_COLOR = '#eb4000';
const TEXT_HEIGHT = 14;
const TEXT_FONT = '12px Roboto';
const X_LABELS = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

/**
 * Draws a graph to the given canvas element with the given data points.
 * @param {HTMLCanvasElement} canvas Target canvas
 * @param {number[]} data An array
 */
export function drawGraph(canvas, data = [0, 0, 0, 0, 0, 0, 0]) {
    if (!canvas) return;
    // Shift data from MTWThFSaSu -> SuMTWThFSa
    data.unshift(data.pop());
    const ctx = canvas.getContext('2d');
    const axes = calculateAxes(data);
    drawAxes(ctx, canvas.height, canvas.width, axes);
    drawBars(ctx, canvas.height, data, axes);
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} canvasHeight 
 * @param {number} canvasWidth 
 * @param {number[]} axes 
 */
function drawAxes(ctx, canvasHeight, canvasWidth, axes) {
    // draw axes
    // draw y-labels

    // draw x-labels
    ctx.font = TEXT_FONT;
    ctx.textAlign = 'center';
    for (const [i, label] of X_LABELS.entries()) {
        const x = 32 + i * (BAR_WIDTH + BAR_PADDING);
        const y = canvasHeight - 32 + 8 + (TEXT_HEIGHT / 2);
        ctx.fillText(label, x, y);
    }
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx The canvas' 2d rendering context
 * @param {number} canvasHeight The canvas' height
 * @param {number[]} data 
 * @param {number[]} axes 
 */
function drawBars(ctx, canvasHeight, data, axes) {
    const maxAxis = axes[axes.length - 1];
    const maxHeight = canvasHeight - 32;
    for (const [i, d] of data.entries()) {
        const barHeight = Math.round(maxHeight * (d / maxAxis));
        if (barHeight > 0) {
            const x = 32 + i * (BAR_WIDTH + BAR_PADDING);
            const y = maxHeight - barHeight;
            drawBar(ctx, x, y, BAR_WIDTH, barHeight, BAR_COLOR);
        }
    }
}

/**
 * Calculate and return 4 y-axes used in the graph. The first axis will always
 * be 0.
 * @param {number[]} data The weekly data to scale the axes by.
 * @return {number[]} The axes in array form, from first axis to last axis.
 */
function calculateAxes(data) {
    // if max data
    //      0 - 3 => just dont change max
    //      4 - 10 => round max up 1
    //      11 - 30 => round max up 2
    // spacing = max axis / 4
    
    // distribute the spacing
    const axes = [0, 1, 2, 3];
    
    // Calculating current max pomo cycles within week 
    let max = Math.max(...data);

    // Checking max value to determine axes values 
    if (max < 4) {
        return axes;
    }
    else if (max < 11) {
        max += 1;
    }
    else {
        max += 2;
    }

    // Setting axes values and rounding to one decimal place 
    axes[1] = (max/3).toFixed(1);
    axes[2] = (2*max/3).toFixed(1);
    axes[3] = max;

    return axes;
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
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x - Math.round(w/2), y, w, h);
    ctx.restore();
}