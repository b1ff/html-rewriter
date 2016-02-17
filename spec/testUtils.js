const jsdom = require('jsdom');

module.exports = {
    parseHtml: function (html, callback) {
        jsdom.env(html, ["http://code.jquery.com/jquery.js"], (error, window) => {
            callback.call(null, error, window);
        });
    }
};