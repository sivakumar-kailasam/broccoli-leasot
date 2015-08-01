broccoli-leasot 
=============

A broccoli plugin for the [leasot](https://github.com/pgilad/leasot) module to parse and output markers like TODOs and FIXMEs from comments

## Repo health & stats
[![Build Status](https://travis-ci.org/sivakumar-kailasam/broccoli-leasot.svg)](https://travis-ci.org/sivakumar-kailasam/broccoli-leasot)  [![Code Climate](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot/badges/gpa.svg)](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot) [![Test Coverage](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot/badges/coverage.svg)](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot/coverage)

[![Dependency Status](https://david-dm.org/sivakumar-kailasam/broccoli-leasot.svg)](https://david-dm.org/sivakumar-kailasam/broccoli-leasot) [![devDependency Status](https://david-dm.org/sivakumar-kailasam/broccoli-leasot/dev-status.svg)](https://david-dm.org/sivakumar-kailasam/broccoli-leasot#info=devDependencies) 

## Installation
`npm install --save-dev broccoli-leasot`

## Usage

```js
var broccoliLeasot = require('broccoli-leasot');
var tree = broccoliLeasot(someTree, options);
```

As a Ember CLI Addon, simply `npm install --save-dev broccoli-leasot` and supply the options you would like:

```js
var app = new EmberApp({
  markers: {
    enabled: true,
    markers: [ 'TODO', 'FIXME', 'CUSTOM']
  }
});
```

## Documentation

### `broccoliLeasot(inputTree, options)`

---

`options.enabled` *{true|false}*

This will eliminate processing altogether.

Default: **false**

---

`options.extensions` *Array of file types to scan*

This indicates the files with specific extensions to be scanned. The complete list can be seen at the [leasot repo](https://github.com/pgilad/leasot#supported-languages)

Default: **['js', 'css', 'less', 'scss', 'hbs', 'handlebars']**

---

`options.kinds` *Array of markers*

These are the markers looked up in the comments of the files which are scanned.

Default: **['TODO', 'FIXME']**

---

`options.groupBy` *file|kind*

The broccoli plugin prints the analysis of leasot on the console. Users can choose between grouping markers by file name or kind of marker.

Default: **file**

---


## Development
This plugin is all about productivity so its written in es6/2015 with the help of [babel.js](https://babeljs.io/). The plugin code is at [src/index.js](https://github.com/sivakumar-kailasam/broccoli-leasot/blob/master/src/index.js). To see the compiled code run `npm run compile` and look at the content of *lib\index.js*

Interested in using babel for your next npm module, read this [excellent article](http://mammal.io/articles/using-es6-today/) on this.


## Tests

Running the tests:

```
npm install
npm test
```
