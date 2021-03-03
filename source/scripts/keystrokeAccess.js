const { startResetController } = require('./startResetButton');
const { taskComplete } = require('./taskButton');
const { openStatsPane, closeStatsPane } = require('./stats');

document.onkeydown = function (e) {
  if (e.code === 'ArrowLeft') {
    e.preventDefault();
    openStatsPane();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    closeStatsPane();
  } else if (e.code === 'Space') {
    e.preventDefault();
    startResetController();
  } else if (e.code === 'Enter') {
    e.preventDefault();
    const today = new Date();
    taskComplete(false, today);
  }
};
