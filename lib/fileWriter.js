const fs = require('fs');

module.exports = {
    writeAll: function (processedFiles) {
        return Promise.all(processedFiles.map((file) => {
            return new Promise((resolve, reject) => {
                fs.writeFile(file.filePath, file.processedContent, 'utf8', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(file);
                    }
                })
            })
        }));
    }
};