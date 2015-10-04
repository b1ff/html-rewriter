'use strict';
let _ = require('lodash');

module.exports = class GeneralRewriter {
    constructor(rewriterData) {
        this.rewriterData = rewriterData;
        if (rewriterData.template) {
            this.template = _.template(rewriterData.template);
        }
    }

    fixTemplate($) {
        return (data) => $(this.template(data)).get(0)
    }

    process(element, $) {
        return this.rewriterData.process(element, $, this.fixTemplate($));
    }

    static fromData(data) {
        return new GeneralRewriter(data);
    }
};