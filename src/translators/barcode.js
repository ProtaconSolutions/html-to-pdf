'use strict';
let bwipjs = require('bwip-js');

class BarcodeTranslator {
  constructor() {
    this.pattern = /\[translate\:barcode(\:)?(.*)?\](.*)/
  }

  translate(input) {
    return new Promise((resolve, reject) => {
      Promise
        .all(Object.keys(input).map((key) => {
          if (this.pattern.test(input[key])) {
            return this._convertAsBase64(input[key]).then(result => input[key] = result);
          }
        }))
        .then(
          () => resolve(input),
          (error) => reject(error)
        );
    })
  }

  _convertAsBase64(text) {
    const matches = text.match(this.pattern);
    const code = matches[3];
    const userOptions = matches[2] ? JSON.parse(matches[2]) : {};
    const defaultOptions = {
      bcid: 'code128',
      text: code,
      scale: 3,
      height: 8,
      textsize: 5,
      includetext: true
    };

    return new Promise((resolve, reject) =>
      bwipjs.toBuffer(Object.assign({}, defaultOptions, userOptions), (error, png) => {
        if (error) {
          reject(error);
        } else {
          resolve(`data:image/png;base64,${png.toString('base64')}`);
        }
      }));
  }
}

module.exports = new BarcodeTranslator();
