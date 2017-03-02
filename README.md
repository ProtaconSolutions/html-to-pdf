# html-to-pdf
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/ProtaconSolutions/html-to-pdf.png?branch=master)](https://travis-ci.org/ProtaconSolutions/html-to-pdf)
[![codecov](https://codecov.io/gh/ProtaconSolutions/html-to-pdf/branch/master/graph/badge.svg)](https://codecov.io/gh/ProtaconSolutions/html-to-pdf)
[![Dependency Status](https://david-dm.org/ProtaconSolutions/html-to-pdf.svg)](https://david-dm.org/ProtaconSolutions/html-to-pdf)
[![devDependency Status](https://david-dm.org/ProtaconSolutions/html-to-pdf/dev-status.svg)](https://david-dm.org/ProtaconSolutions/html-to-pdf#info=devDependencies)

## What is this?
Simple tool to convert HTML content to PDF

## Installation, configure and usage
### Preconditions
First of all you have to install `npm` and `node.js` to your box - note that `NodeJS 6+` is required. See following links to help you with installation:
* [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/)
* [Node Version Manager](https://github.com/creationix/nvm#installation)

### Installation
First of all you have to install ```npm``` and ```node.js``` to your box. Installation instructions can
be found [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager). 

Note that ```node.js 6.x``` is required.

```bash
$ git clone https://github.com/ProtaconSolutions/html-to-pdf.git
$ cd html-to-pdf

# install the project's dependencies
$ npm install

# fast install (via Yarn, https://yarnpkg.com)
$ yarn install  # or yarn
```

## Usage
### Command line
See help
```bash
$ npm run convert
# OR
$ node bin/convert
```

Creating example file
```bash
$ npm run convert -- src/examples/example.html example.pdf --data '{"title": "Awesome", "content": "Lorem ipsum dolor."}'
# OR
$ node bin/convert src/examples/example.html example.pdf --data '{"title": "Awesome", "content": "Lorem ipsum dolor."}'
```

### Web UI
Start server
```bash
$ npm start
```

Then open your `http://localhost:3000/` within your favorite browser.

### Translators
Translators are way to make embedded dataconversions to templates.

```
data: { barcode: '[translate:type]value'}
```

#### barcode
Translates textual content as barcode. Output is base64 encoded image string.

```
data: { barcode: '[translate:barcode]AE5C9B'}
```

Can be embedded to template HTML:

```
<img src="{{ barcode }}"/>
```

### API


## Author
Protacon Solutions Ltd

## License
[The MIT License (MIT)](LICENSE)

Copyright (c) 2017 Protacon Solutions Ltd