import Filter from 'broccoli-filter';
import path from 'path';
import leasot from 'leasot';
import chalk from 'chalk';
import {
	groupBy as groupByFn,
	forEach as forEachFn
} from 'lodash/collection';
import {
	forOwn as forOwnFn
} from 'lodash/object';


const DEFAULT_SUPPORTED_FILE_EXTENSIONS = ['js', 'css', 'less', 'scss', 'hbs', 'handlebars'];
const DEFAULT_MARKERS = ['TODO', 'FIXME'];


const printExceptions = (stdout, exceptions) => {
	let _exceptions = exceptions;
	if (_exceptions.length > 0) {
		_exceptions = _exceptions.filter((exception, i) => {
			return _exceptions.indexOf(exception) === i;
		});
		const header = chalk.red(`Leasot module doesn't support ${_exceptions.join(', ')}`);
		const linkToSupportedExtensions = chalk.blue.underline('https://github.com/pgilad/leasot#supported-languages');
		stdout.log(`\n${header} \n${linkToSupportedExtensions}`);
	}
};


const getMessageToPrint = (marker, groupByEntity, groupByCriteria) => {
	let inlineGroup = 'kind';
	if (groupByCriteria === 'kind') {
		inlineGroup = 'file';
	}
	let textToAdd = '';
	marker.forEach((m) => {
		textToAdd += `${chalk.gray('line ' + m.line)}   ${chalk.green(m[inlineGroup])}  ${chalk.cyan(m.text)}\n`;
	});
	return `${chalk.underline(groupByEntity)}\n${textToAdd}`;
};


const printMarkers = (stdout, markers, groupBy, treeInternalName) => {
	let _markers = [].concat.apply([], markers);
	let noOfMarkers = _markers.length;
	_markers = groupByFn(_markers, groupBy);

	forEachFn(_markers, (marker, groupByEntity) => {
		stdout.log(getMessageToPrint(marker, groupByEntity, groupBy));
	});

	let messageToShow = chalk.red.bold('✘') + ` ${noOfMarkers} markers found in ${treeInternalName}`;
	if (noOfMarkers === 0) {
		messageToShow = chalk.green.bold('✔') + ' No markers found in ${treeInternalName}';
	}

	stdout.log(`\n  ${messageToShow} \n`);
};


class BroccoliLeasotFilter extends Filter {

	constructor(inputTree, options, treeInternalName) {
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
		this.treeInternalName = treeInternalName;
		this.console = (options && options['console']) || console;

		const context = this;

		forOwnFn(options, (value, key) => {
			context[key] = value;
		});

		if (['file', 'kind'].indexOf(this.groupBy.toLowerCase()) === -1) {
			this.groupBy = 'file';
		}

	}

	build(readTree, destDir) {
		const self = this;
		return super.build(readTree, destDir).then(() => {
			if(self.enabled) {
				printMarkers(self.console, self._markers, self.groupBy, self.treeInternalName);
				printExceptions(self.console, self._exceptions);
			}
		});
	}

	processString(content, relativePath) {
		if (this.enabled) {
			const fileExtension = path.extname(relativePath);
			if (leasot.isExtSupported(fileExtension)) {
				this._markers.push(leasot.parse({
					ext: fileExtension, 
					content: content, 
					fileName: relativePath, 
					customTags: this.kinds
				}));
			} else {
				this._exceptions.push(fileExtension);
			}
		}
		return content;
	}

}


export default (inputTree, options, treeInternalName) => {
	return new BroccoliLeasotFilter(inputTree, options, treeInternalName);
};
