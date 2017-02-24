'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const htmlToPdf = require('./../../index');

/**
 * Default route to show a demo form.
 */
router.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'HTML to PDF server',
      serverAddress: req.protocol + '://' + req.get('host') + req.originalUrl,
      defaultFilename: 'output.pdf',
      defaultSource: fs.readFileSync(path.resolve(__dirname, '..', '..', 'examples', 'simple.html')),
      defaultTemplateData: fs.readFileSync(path.resolve(__dirname, '..', '..', 'examples', 'simple-data.json')),
      defaultOptions: '{}',
    }
  );
});

/**
 * POST route to home, this will generate actual PDF according to user input
 */
router.post('/', (req, res, next) => {
  const source = req.body.source || '<html><body><p>No source</p></body>';
  const data = req.body.data ? JSON.parse(req.body.data) : {};
  const options = req.body.options ? JSON.parse(req.body.options) : {};

  htmlToPdf
    .createBuffer(source, data, options)
    .then(buffer => res.end(buffer, 'binary'))
    .catch(error => next(error));
});

module.exports = router;
