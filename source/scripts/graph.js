/**
 * Draws a graph to the given canvas element with the given data points.
 * @param {HTMLCanvasElement} canvas 
 * @param {Array} data An array 
 */
export function drawGraph(canvas, data = [0, 0, 0, 0, 0, 0, 0]) {
    if (!canvas) return;
    
    const axes = calculateAxes(data);
    drawAxes(axes);
    drawBars(data, axes);
}

/**
 * 
 * @param {*} data 
 */
function drawAxes(axes) {
    // draw axes
    // draw axes labels
}

/**
 * 
 * @param {*} data The weekly data that defines the bar height.
 * @param {*} axes 
 */
function drawBars(data, axes) {
    // scale bars to the axis (datapoint / max axis)
    // draw
}

/**
 * Calculate and return 4 y-axes used in the graph. The first axis will always
 * be 0.
 * @param {*} data The weekly data to scale the axes by.
 * @return {*} The axes in array form, from first axis to last axis.
 */
function calculateAxes(data) {
    // scale axes to max data
    //      1 - 3 => just dont change max
    //      4 - 10 => round max up 1
    //      11 - 30 => round max up 2
    // spacing = max axis / 4
    // distribute the spacing
    return [0, 1, 2, 3];
}