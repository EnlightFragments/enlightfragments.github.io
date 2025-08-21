const fs = require('node:fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const content = fs.readFileSync("layouts/_default/baseof.html", 'utf8');
const { document } = (new JSDOM(content)).window;

const articles = document.getElementsByTagName("li");

for (let article of articles) {
    console.log(article)
}
