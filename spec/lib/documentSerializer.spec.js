var expect = require('chai').expect;
const jsdom = require('jsdom').jsdom;
const serialize = require('../../lib/documentSerializer');

describe('lib/documentSerializer', function () {

    function documentWith(bodyContent) {
        return jsdom('<html><head></head><body>' + bodyContent + '</body></html>');
    }

    it('should serialize simple DOM', function () {
        const bodyContent = '<div>A test content</div>';
        const document = documentWith(bodyContent);

        expect(serialize(document)).to.equal(bodyContent);
    });

    it('should exclude jsdom items', function () {
        const document = documentWith(
            'hello<script class="jsdom"></script>'
        );

        expect(serialize(document)).not.to.have.string('script class="jsdom"');
    });

    it('should preserve special symbols in attributes', function () {
        const document = documentWith(
            '<div ng-if="condition1 && condition2">A text</div>'
        );

        expect(serialize(document)).to.have.string('condition1 && condition2');
    });

    it('should encode text content', function () {
        const document = documentWith(
            '<div>A text condition1 && condition2</div>'
        );

        expect(serialize(document)).to.have.string('condition1 &amp;&amp; condition2');
    });

    // TODO: fix it.
    xit('should preserve templates in the text content', function () {
        const document = documentWith(
            "<div>{{condition && cs ? 'value1' : 'value2'}}</div>"
        );

        expect(serialize(document)).to.have.string('condition1 &amp;&amp; condition2');
    });
});