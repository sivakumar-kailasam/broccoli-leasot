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
import {
  forOwn as forOwnFn
}
from 'lodash/object';

const DEFAULT_SUPPORTED_FILE_EXTENSIONS = ['js', 'css', 'less', 'scss', 'hbs', 'handlebars'];
const DEFAULT_MARKERS = ['TODO', 'FIXME'];

let printExceptions = (exceptions) => {
  let _exceptions = exceptions;
  if (_exceptions.length > 0) {
    _exceptions = _exceptions.filter((exception, i) => {
      return _exceptions.indexOf(exception) === i;
    });
    let header = chalk.red(`Leasot module doesn't support ${_exceptions.join(', ')}`);
    let linkToSupportedExtensions = chalk.blue.underline('https://github.com/pgilad/leasot#supported-languages');
    console.log(`\n${header} \n${linkToSupportedExtensions}`);
  }
};

let getMessageToPrint = (marker, groupByEntity, groupByCriteria) => {
  let inlineGroup = 'kind';
  if (groupByCriteria === 'kind') {
    inlineGroup = 'file';
  }
  let textToAdd = '';
  marker.forEach((m) => {
    textToAdd += `${chalk.gray('line ' + m.line)} ${chalk.green(m[inlineGroup])} ${chalk.cyan(m.text)} \n`;
  });
  return `${chalk.underline(groupByEntity)}\n${textToAdd}`;
};

let printMarkers = (markers, groupBy) => {
  let _markers = [].concat.apply([], markers);
  _markers = groupByFn(_markers, groupBy);

  forEachFn(_markers, (marker, groupByEntity) => {
    console.log(getMessageToPrint(marker, groupByEntity, groupBy));
  });
};


class BroccoliLeasotFilter extends Filter {

  constructor(inputTree, options) {
    super(inputTree, options);

    /* defaults */
    this.enabled = false;
    this.kinds = DEFAULT_MARKERS;
    this.extensions = DEFAULT_SUPPORTED_FILE_EXTENSIONS;
    this.groupBy = '';

    /* internals */
    this.inputTree = inputTree;
    this._markers = [];
    this._exceptions = [];

    let context = this;
    forOwnFn(options, (value, key) => {
      context[key] = value;
    });

    if (['file', 'kind'].indexOf(this.groupBy.toLowerCase()) === -1) {
      this.groupBy = 'file';
    }

  }

  build(readTree, destDir) {
    let self = this;
    return super.build(readTree, destDir).then(() => {
      printMarkers(self._markers, self.groupBy);
      printExceptions(self._exceptions);
    });
  }

  processString(content, relativePath) {
    if (this.enabled) {
      let fileExtension = path.extname(relativePath);
      if (leasot.isExtSupported(fileExtension)) {
        this._markers.push(leasot.parse(fileExtension, content, relativePath, this.kinds));
      } else {
        this._exceptions.push(fileExtension);
      }
    }
    return content;
  }

}


export default (inputTree, options) => {
  return new BroccoliLeasotFilter(inputTree, options);
};
