const fs = require('node:fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const content = fs.readFileSync("layouts/_default/baseof.html", 'utf8');
const { document } = (new JSDOM(content)).window;

const posts = document.getElementsByClassName("post-list")[0];
const articles = posts.children;

const months = new Map([
    ['Jan', '01'],
    ['Feb', '02'],
    ['Mar', '03'],
    ['Apr', '04'],
    ['May', '05'],
    ['Jun', '06'],
    ['Jul', '07'],
    ['Aug', '08'],
    ['Sep', '09'],
    ['Oct', '10'],
    ['Nov', '11'],
    ['Dec', '12'],
])

for (let article of articles) {
    const title = article.getElementsByClassName("post-title")[0].innerHTML;
    const meta = article.getElementsByClassName("post-meta")[0].innerHTML;

    const matches = meta.match(/^([^\s]*)\s([^\s]*),\s([^\s]*)/);

    const monthStr = matches[1];
    const month = months.get(monthStr);
    const day = matches[2];
    const year = matches[3];
    const dayStr = day.length < 2 ? `0${day}` : day;
    const fileName = `${year}-${month}-${dayStr}-${title.replace(/\s+/g, "-").toLowerCase()}.md`;
    console.log(fileName);
}
