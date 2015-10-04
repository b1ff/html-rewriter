'use strict';

const _ = require('lodash');
const parse5 = require("parse5");
const serializer = new parse5.TreeSerializer(require('./documentAdapter'), {
    encodeHtmlEntities: false
});
const DOCUMENT_NODE = 9;

function fetchDocumentNodes(document) {
    return _.chain(document.body.childNodes)
        .toArray()
        .filter((n) => !n.className || n.className.indexOf('jsdom') === -1)
        .value();
}

module.exports = function (documentNode) {
    const bodyChildNodes = fetchDocumentNodes(documentNode);
    return _.chain(bodyChildNodes)
        .map((node) => node === DOCUMENT_NODE ? node : {childNodes: [node]})
        .map((toSerialize) => serializer.serialize(toSerialize))
        .join('')
        .value()
};