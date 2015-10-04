'use strict';

const findFiles = require('findit'),
    path = require('path');

module.exports = function (directory) {
    console.log("Scanning in dir " + directory);

    return new Promise((resolve, reject) => {
        var finder = findFiles(directory),
            files = [];
        finder.on('file', (filePath) => {
            const ext = path.extname(filePath);
            if (ext !== '.html') {
                return;
            }

            files.push(filePath);
        });

        finder.on('end', () => resolve(files));
        finder.on('error', (err) => reject(err));
    });
};
