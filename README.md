broccoli-leasot [![Build Status](https://travis-ci.org/sivakumar-kailasam/broccoli-leasot.svg)](https://travis-ci.org/sivakumar-kailasam/broccoli-leasot)  [![Code Climate](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot/badges/gpa.svg)](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot)  [![Test Coverage](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot/badges/coverage.svg)](https://codeclimate.com/github/sivakumar-kailasam/broccoli-leasot/coverage) [![devDependency Status](https://david-dm.org/sivakumar-kailasam/broccoli-leasot/dev-status.svg)](https://david-dm.org/sivakumar-kailasam/broccoli-leasot#info=devDependencies)
=============

A broccoli plugin for the [leasot](https://github.com/pgilad/leasot) module to parse and output markers like TODOs and FIXMEs from comments

## Installation
`npm install --save-dev broccoli-leasot`

## Usage

```js
var broccoliLeasot = require('broccoli-leasot');
var tree = broccoliLeasot(someTree);
```

As a Ember CLI Addon, simply `npm install --save-dev broccoli-leasot` and supply the options you would like:

```js
var app = new EmberApp({
  broccoliLeasotOptions: {
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


## Tests

Running the tests:

```
npm install
npm test
```
