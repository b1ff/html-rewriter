'use strict';

const expect = require('chai').expect,
    job = require('../../index'),
    labelRewriter = require('../../rewriters/labelRewriter')
    ;

describe('rewriters/labelRewriter', function () {
    var processedHTML;

    function saveProcessed(sourceHtml, done) {
        job.refactorFile(sourceHtml, [labelRewriter])
            .then((result) => {
                processedHTML = result.processedContent;
            })
            .then(done, done);
    }

    describe('when table cell has only text', function () {
        beforeEach(function (done) {
            var html = '<form><table><tbody><tr><td>A raw text</td></tr></tbody></table></form>';
            saveProcessed(html, done);
        });


        it('should replace raw text in table cells with label', function () {
            expect(processedHTML).to.have.string(
                '<form><table><tbody><tr><td class=" label-cell"><label>A raw text</label></td></tr></tbody></table></form>');
        });
    });

    describe('when table cell has class', function () {
        beforeEach(function (done) {
            var html = '<form><table><tbody><tr><td class="test-class">A raw text</td></tr></tbody></table></form>';
            saveProcessed(html, done);
        });


        it('should correctly add label class', function () {
            expect(processedHTML).to.have.string(
                '<form><table><tbody><tr><td class="test-class label-cell"><label>A raw text</label></td></tr></tbody></table></form>');
        });
    });

    describe('when table cell has only spaces', function () {

        beforeEach(function (done) {
            saveProcessed('<form><table><tbody><tr><td>&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td></tr></tbody></table></form>', done);
        });

        it('should not process cells', function () {
            expect(processedHTML).to.be.undefined;
        });
    });
});