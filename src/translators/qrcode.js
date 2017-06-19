'use strict';

const QRCode = require('qrcode');
const Stream = require('stream');

class QRCodeTranslator {
  constructor() {
    this.pattern = /\[translate\:qrcode\](.*?)/
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
    });
  }

  _convertAsBase64(text) {
    const code = text.replace('[translate:qrcode]', '');

    return new Promise((resolve, reject) => {
      let stream = new Stream.PassThrough();
      let data = new Buffer('');

      QRCode.toFileStream(stream, code, {});

      stream.on('data', (chunk) => {
        data = Buffer.concat([data, chunk]);
      });

      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('end', () => {
        resolve(`data:image/png;base64,${data.toString('base64')}`);
      });
    });
  }
}

module.exports = new QRCodeTranslator();
