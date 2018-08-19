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

  // https.get(url, function(response) {
  //   response.pipe(file);
  //   file.on('finish', function() {
  //     file.close(cb);  // close() is async, call cb after close completes.
  //   });
  // }).on('error', function(err) { // Handle errors
  //   console.log('ERROR', iconName, type, err);
  //   fs.unlinkSync(dest); // Delete the file async. (But we don't check the result)
  //   if (cb) cb(err.message);
  // });
};