'use strict';
import Filter from 'broccoli-filter';
import path from 'path';
import leasot from 'leasot';
import chalk from 'chalk';
import {
  groupBy as groupByFn, 
  forEach as forEachFn
}
from 'lodash/collection';


let printExceptions = function printExceptions(exceptions) {
  var _exceptions = exceptions;
  if (_exceptions.length > 0) {
    _exceptions = _exceptions.filter(function(exception, i) {
      return _exceptions.indexOf(exception) === i;
    });

    console.log(
      '\n' +
      chalk.red('Leasot module doesn\'t support ' + _exceptions.join(', ')) +
      '\n' +
      chalk.blue.underline('https://github.com/pgilad/leasot#supported-languages')
    );

  }
};

let getMessageToPrint = function getMessageToPrint(marker, groupByEntity, groupByCriteria) {
  var inlineGroup = 'kind';
  if (groupByCriteria === 'kind') {
    inlineGroup = 'file';
  }
  var textToAdd = '';
  marker.forEach(function(m) {
    textToAdd += chalk.gray('line ' + m.line) +
      ' ' +
      chalk.green(m[inlineGroup]) +
      ' ' +
      chalk.cyan(m.text) + '\n';
  });
  return chalk.underline(groupByEntity) + '\n' + textToAdd;
};

let printMarkers = function printMarkers(markers, groupBy) {
  let _markers = [].concat.apply([], markers);
  _markers = groupByFn(_markers, groupBy);

  forEachFn(_markers, function(marker, groupByEntity) {
    console.log(
      getMessageToPrint(marker, groupByEntity, groupBy)
    );
  });
};


class BroccoliLeasotFilter extends Filter {

  constructor(inputTree, options) {
    super(inputTree, options);

    this.options = options || {};

    /* defaults */
    this.enabled = false;
    this.kinds = ['TODO', 'FIXME'];
    this.extensions = ['js', 'css', 'less', 'scss', 'hbs', 'handlebars'];
    this.groupBy = '';

    /* internals */
    this.inputTree = inputTree;
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

  }

  build(readTree, destDir) {
    let self = this;
    return super.build(readTree, destDir).then(function() {
      printMarkers(self._markers, self.groupBy);
      printExceptions(self._exceptions);
    });
  }

  processString(content, relativePath) {
    if (this.enabled) {
      var fileExtension = path.extname(relativePath);

      if (leasot.isExtSupported(fileExtension)) {
        this._markers.push(leasot.parse(fileExtension, content, relativePath, this.kinds));
      } else {
        this._exceptions.push(fileExtension);
      }
    }
    return content;
  }

}


export default function(inputTree, options) {
  return new BroccoliLeasotFilter(inputTree, options);
}
