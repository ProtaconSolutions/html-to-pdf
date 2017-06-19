'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const pdf = require('html-pdf');
const hogan = require('hjs');
const path = require('path');
const upath = require('upath');
const barcodeTranslate = require('./translators/barcode');
const qrcodeTranslate = require('./translators/qrcode');

class HtmlToPdf {
  createFileFromSourceFile(sourceFile, destination, data, options) {
    let dir = upath.normalize(path.resolve(path.dirname(sourceFile)));

    let extendedOptions = Object.assign({}, {
      base: `file:///${dir}/`
    }, options);

    return this.createFileFromSource(fs.readFileSync(sourceFile, 'utf8'), destination, data, extendedOptions);
  }

  createFileFromSource(source, destination, data, options) {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          barcodeTranslate.translate(data),
          qrcodeTranslate.translate(data)
        ])
        .then(
          () => {
            HtmlToPdf
              .createPdf(source, data, options)
              .toFile(destination, (error, result) => {
                error ? reject(error) : resolve(result);
              });
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createBuffer(source, data, options) {
    return new Promise((resolve, reject) => {
      Promise
        .all([
          barcodeTranslate.translate(data),
          qrcodeTranslate.translate(data)
        ])
        .then(
          () => {
            HtmlToPdf
              .createPdf(source, data, options)
              .toBuffer((error, result) => {
                error ? reject(error) : resolve(result);
              });
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  static createPdf(source, data, options) {
    options = options || {};

    const usedOptions = Object.assign({}, HtmlToPdf.getDefaultOptions(), options);

    return pdf.create(HtmlToPdf.render(source, data), usedOptions)
  }

  static render(source, data) {
    data = data || {};

    return hogan.compile(source).render(data);
  }

  static getDefaultOptions() {
    return {
      format: 'a4',
      header: {
        height: '0',
      },
      footer: {
        height: '0',
      },
      quality: '75',
    };
  }
}

module.exports = new HtmlToPdf();
