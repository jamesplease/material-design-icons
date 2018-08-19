const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

module.exports = function getIconList() {
  const PAGE_PATH = path.join(__dirname, 'page.html');
  const html = fs.readFileSync(PAGE_PATH, { encoding: 'utf-8' });
  
  // Load up the document
  const $ = cheerio.load(html);
  
  // Filter stuff
  return $('.icon-image-preview').map(function(i, el) {
    return $(this).removeClass('icon-image-preview').attr('class');
  }).get().map(val => val.replace(/^baseline-/, ''));
}
