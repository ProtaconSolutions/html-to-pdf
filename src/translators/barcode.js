'use strict';
let bwipjs = require('bwip-js');

class BarcodeTranslator {
    constructor() {
        this.pattern = /\[translate\:barcode\](.*?)/
    }

    _convertAsBase64(text) {
        text = text.replace('[translate:barcode]', '')

        return new Promise((resolve, reject) =>
            bwipjs.toBuffer({
                bcid: 'code128',
                text: text,
                scale: 3,             
                height: 8,     
                textsize: 5,        
                includetext: true      
            }, function (err, png) {
                if (err) {
                    reject(err);
                } else {

                    let data = `data:image/png;base64,${png.toString('base64')}`
                    resolve(data);
                }
            }));
    }

    translate(input) {
        return new Promise((resolve, reject) => {
            Promise
                .all(Object.keys(input).map((key, index) => {
                    if (this.pattern.test(input[key])) {

                        return this._convertAsBase64(input[key])
                            .then(r => input[key] = r);
                    }
                }))
                .then(_ => resolve(input), err => reject(err));
        })
    }
}

module.exports = new BarcodeTranslator();