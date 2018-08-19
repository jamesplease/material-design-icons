const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const getIconList = require('./get-icon-list');
const downloadFile = require('./download-file');
const iconTypes = require('./icon-types.json');
const getSvgUrl = require('./get-svg-url');

// Ensure that all of the necessary directories exist
iconTypes
  .map(type => path.join(__dirname, '..', 'icons', type))
  .forEach(path => mkdirp.sync(path));

function getDestinationPath(iconName, type) {
  return path.join(__dirname, '../', 'icons', type, `${iconName}.svg`);
};

const DEST = path.join(__dirname, '../', 'icons', 'test.svg');
// const DEST_PATH = path.join(__dirname, '../', 'results.json');

const iconList = getIconList();

const result = _.chain(getIconList())
  .flatMap(iconName => {
    return iconTypes.map(type => {
      return {
        iconName,
        type,
        downloadUrl: getSvgUrl(iconName, type),
        destinationPath: getDestinationPath(iconName, type)
      };
    });
  })
  .value();

result.forEach((val, index) => {
  downloadFile(val.downloadUrl, val.destinationPath, val.iconName, val.type, () => {});
});

// getIconList()
//   .map(iconName => {
//     return {
//       downloadUrl: getSvgUrl(first, iconTypes[0]),

//     }
//   });

// const first = iconList[0];
// const firstUrl = getSvgUrl(first, iconTypes[0]);

// downloadFile(firstUrl, DEST, function() {
//   console.log('done!');
// });

// fs.writeFileSync(DEST_PATH, JSON.stringify(iconList, null, 2), { encoding: 'utf-8' });