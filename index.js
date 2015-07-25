'use strict';
var Filter = require('broccoli-filter');
var path = require('path');
var leasot = require('leasot');
var chalk = require('chalk');

function BroccoliLeasotFilter(inputTree, options) {
  if (!(this instanceof BroccoliLeasotFilter)) {
    return new BroccoliLeasotFilter(inputTree, options);
  }
  this.options = options || {};

  this.enabled = false;
  this.kinds = ['TODO', 'FIXME'];
  this.extensions = ['js', 'css', 'less', 'scss', 'hbs', 'handlebars'];
  this.groupBy = '';

  this.inputTree = inputTree;
  this.console = console;
  this._markers = [];
  this._exceptions = [];

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      this[key] = options[key];
    }
  }

  if (['file', 'kind'].indexOf(this.groupBy.toLowerCase()) === -1) {
    this.groupBy = 'file';
  }

  this.leasot = leasot;
  Filter.call(this, inputTree);
}

module.exports = BroccoliLeasotFilter;

BroccoliLeasotFilter.prototype = Object.create(Filter.prototype);
BroccoliLeasotFilter.prototype.constructor = BroccoliLeasotFilter;
BroccoliLeasotFilter.prototype.extensions = ['js'];


BroccoliLeasotFilter.prototype.build = function(readTree, destDir) {
  var self = this;
  return Filter.prototype.build.call(self, readTree, destDir).then(function() {
    printMarkers(self);
    printExceptions(self);
  });
};

/**
 * Sample marker from leasot
 * { 
 *     file: 'app/templates/level1/something.hbs',
 *     kind: 'TODO',
 *     line: 3,
 *     text: 'add fancy css classes' 
 *  }
 *     
 */
function printMarkers(context) {
  context._markers = [].concat.apply([], context._markers);
  context._markers.map(function(marker) {
    context.console.log(
      chalk.underline(marker.file) +
      '\n' +
      chalk.gray('line ' + marker.line) +
      ' ' +
      chalk.green(marker.kind) +
      ' ' +
      chalk.cyan(marker.text) + '\n'
    );
  });
}

function printExceptions(context) {
  if (context._exceptions.length > 0) {
    context._exceptions = context._exceptions.filter(function(exception, i) {
      return context._exceptions.indexOf(exception) === i;
    });

    context.console.log(
      '\n' +
      chalk.red('Leasot module doesn\'t support ' + context._exceptions.join(', ')) +
      '\n' +
      chalk.blue.underline('https://github.com/pgilad/leasot#supported-languages')
    );

  }
}

BroccoliLeasotFilter.prototype.processString = function processString(content, relativePath) {
  if (this.enabled) {
    var fileExtension = path.extname(relativePath);

    if (this.leasot.isExtSupported(fileExtension)) {
      this._markers.push(this.leasot.parse(fileExtension, content, relativePath, this.kinds));
    } else {
      this._exceptions.push(fileExtension);
    }
  }
  return content;
};
