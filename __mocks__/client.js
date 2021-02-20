import { JSDOM } from "jsdom";
const fs = require('fs');
const dom = new JSDOM();
global.document = dom.window.document;
global.document.body.innerHTML = fs.readFileSync('./source/index.html').toString();
global.window = dom.window;