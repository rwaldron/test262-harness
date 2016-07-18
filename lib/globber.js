'use strict';
const glob = require('glob');
const Rx = require('rx');

function globber(paths) {
  const files = new Rx.Subject();
  files.fileEvents = [];

  const Glob = glob.Glob;

  paths.forEach(function (path) {
    const fileEvents = new Glob(path);

    fileEvents.on('match', function (file) {
      files.onNext(file);
    });

    fileEvents.on('end', function () {
      files.onCompleted();
    });

    files.fileEvents.push(fileEvents);
  })

  return files;
}

module.exports = globber;