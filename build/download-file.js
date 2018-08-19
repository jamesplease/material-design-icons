const request = require('requestretry');
const fs = require('fs');

module.exports = function downloadFile(url, dest, iconName, type, cb) {
  var file = fs.createWriteStream(dest);

  const saveStream = request(url, {
    maxAttempts: 5,
    retryDelay: 500
  })
    .pipe(file);

  saveStream
    .on('error', (err) => {
      console.log('ERROR', iconName, type, err);
    });

  saveStream.on('finish', () => {
    return Promise.resolve();
  });
};