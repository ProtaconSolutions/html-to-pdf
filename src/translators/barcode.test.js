'use strict';

let expect = require('chai').expect;

describe('Translating data object as barcodes', () => {
    let barcode = require('./barcode');

    it('should not change value if data doesnt match pattern', () => {
        return barcode.translate({ nonMatchingProperty: 3 })
            .then(r => {
                expect(r.nonMatchingProperty).to.equal(3);
            });
    });

    it('should rewrite property if matches [translate:barcode]*', () => {
        return barcode.translate({ matchingProperty: "[translate:barcode]1234" })
            .then(r => {
                expect(r.nonMatchingProperty).to.not.equal("[translate:barcode]1234");
            });
    });

    it('should rewrite property as valid base64 encoded barcode', () => {
        return barcode.translate({ matchingProperty: "[translate:barcode]1234", nonMatchingProperty: "abc" })
            .then(r => {
                expect(r.matchingProperty).to.match(/^data\:image\/png\;base64,iVBORw0KGgo.*/);
                expect(r.nonMatchingProperty).to.equal("abc");
            });
    });
});