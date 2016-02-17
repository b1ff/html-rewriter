'use strict';
const _ = require('lodash');
const TEXT_NODE = 3;

module.exports = {
    template: '<label>${ text }</label>',
    selector: 'form td',
    process: function (tableCell, $, template) {
        let processed = _.chain(tableCell.childNodes)
            .filter((child) => child.nodeType === TEXT_NODE)
            .map((n) => {
                return {
                    textNode: n,
                    text: n.nodeValue
                };
            })
            .filter((r) => !/^\s+$/g.test(r.text))
            .each((r) => {
                tableCell.insertBefore(template({text: r.text}), r.textNode);
                tableCell.removeChild(r.textNode);
                tableCell.className = tableCell.className + ' label-cell';
            })
            .value();

        return processed.length > 0 ;
    }
};