'use strict';
const jsdom = require('jsdom'),
    GeneralRewriter = require('./GeneralRewriter'),
    _ = require('lodash');

module.exports = {
    /**
     * Converts passed parameter to DOM
     * @param html{String}
     *              could be HTML string, file URL or file path.
     * @returns {Promise} a promise with root window object when processing is done.
     */
    toDom: (html) => {
        return new Promise((resolve, reject) => {
            jsdom.env(html, ["http://code.jquery.com/jquery.js"], (error, window) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(window);
            });
        });
    },

    updateDOM: (window, processors) => {
        return _.any(processors, (p) => {
            const $ = window.$;
            const rewriter = GeneralRewriter.fromData(p);
            const elements = $(p.selector);
            return _.reduce(elements, (anyProcessed, el) => {
                return rewriter.process(el, $) || anyProcessed;
            }, false);
        });
    }
};