'use strict';
const fileWriter = require('./lib/fileWriter'),
    serializeDocument = require('./lib/documentSerializer'),
    htmlWorker = require('./lib/htmlWorker')
    ;

function updateDom(filePath, window, rewriters) {
    let updated = htmlWorker.updateDOM(window, rewriters);

    if (!updated) {
        return Promise.resolve({});
    }

    return Promise.resolve({
        filePath: filePath,
        processedContent: serializeDocument(window.document)
    });
}

module.exports = {
    htmlSeeker: require('./lib/htmlFilesLookup'),
    refactorAllInDirectory: function (directory, rewriters) {
        this.htmlSeeker(directory)
            .then((files) => {
                return Promise.all(files.map((filePath) => this.refactorFile(filePath, rewriters)));
            }, (err) => console.log(err))
            .then((processedFiles) =>
                fileWriter.writeAll(processedFiles.filter((file) => !!file.filePath))
        );
    },
    refactorFile: function (html, rewriters) {
        console.log('Process file: ', html);
        return htmlWorker.toDom(html).then((window) => {
            try {
                return updateDom(html, window, rewriters);
            } catch(e) {
                console.error(e.stack);
                return Promise.reject(e);
            }
        });
    }
};
