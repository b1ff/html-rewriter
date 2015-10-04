'use strict';
let expect = require('chai').expect,
    GeneralRewriter = require('../../lib/GeneralRewriter');

describe('lib/GeneralRewriter', function () {

    beforeEach(function() {
    });

    describe('constructor', function() {
        it('compiles template', function(){
            let r = new GeneralRewriter({
                template: '<div>${ text }</div>'
            });

            expect(r.template({text: 'A test text'})).to.equal('<div>A test text</div>');
        })
    });

});