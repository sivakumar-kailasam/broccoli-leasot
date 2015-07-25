broccoli-leasot
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
kinds: [ 'TODO', 'FIXME', 'CUSTOM'],
extensions: ['js', 'css', 'less', 'scss', 'hbs', 'handlebars'],
groupBy: 'file|kind'
---

`options.enabled` *{true|false}*

This will eliminate processing altogether.

Default: **false**

---


## Tests

Running the tests:

```
npm install
npm test
```