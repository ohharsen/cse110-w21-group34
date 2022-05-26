window.addEventListener('load', function() {
  const logRocketScript = document.createElement('script');
  logRocketScript.src = 'https://cdn.lr-in-prod.com/LogRocket.min.js';
  insertScript(logRocketScript);
});

function insertScript(url) {
  setTimeout(function() {
    const scriptlength = document.getElementsByTagName('script').length - 1;
    document.getElementsByTagName('script')[scriptlength].after(url);
    insertInit();
  }, 1000);
}

function insertInit() {
  setTimeout(function() {
    window.LogRocket && window.LogRocket.init('umcvob/texascodeem');
  }, 1000);
}

