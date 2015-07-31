/* jshint expr: true */
/* Included above statement for chai*/

import chai from 'chai';
import sinonChai from 'sinon-chai';
import {
	Builder as BroccoliBuilder
}
from 'broccoli';
import fixtureTree from 'broccoli-fixturify';
import stripAnsi from 'strip-ansi';
import fixtures from './fixtures';
import BroccoliLeasotFilter from '../src/index';

let expect = chai.expect;
chai.use(sinonChai);


describe('Functional test suite for Broccoli Leasot', () => {
	let broccoliLeasot;
	let fileTree;
	let message = '';
	let konsole = {
		log: function(msg) {
			message += stripAnsi(msg);
		}
	};
	
	let checkWithMarkerForGroupByFile = (marker) => {
		expect(message).to.include(marker.trim());
	};

	let checkWithMarkerForGroupByKind = (marker) => {
		expect(message).to.include(marker.trim().replace('FIXME','').replace('TODO','').replace('CUSTOM_TAG',''));
	};

	let setupFixtureTree = function(includeImaginaryExtension = false) {
		let tree = {
			app: {
				css: {
					'application.css': fixtures.getCssContent()
				},
				js: {
					'app.js': fixtures.getJsContent()
				},
				templates: {
					'index.handlebars': fixtures.getHbsContent()
				}
			}
		};
		if (includeImaginaryExtension) {
			tree.app['warriors'] = {
				'rocky.balboa': ''
			};
		}
		fileTree = fixtureTree(tree);
	};


	afterEach(() => {
		message = '';
		fileTree = null;
	});

	it('Basic setup', () => {
		setupFixtureTree();
		broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
			enabled: true,
			kinds: ['TODO', 'FIXME', 'CUSTOM_TAG'],
			console: konsole
		});
		let outputTree = new BroccoliBuilder(broccoliLeasot);
		return outputTree.build().then(function() {
			fixtures.jsMarkers.forEach(checkWithMarkerForGroupByFile);
			fixtures.cssMarkers.forEach(checkWithMarkerForGroupByFile);
			fixtures.hbsMarkers.forEach(checkWithMarkerForGroupByFile);
		});

	});


	it('Group by type', () => {
		setupFixtureTree();
		broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
			enabled: true,
			kinds: ['TODO', 'FIXME', 'CUSTOM_TAG'],
			groupBy: 'kind',
			console: konsole
		});
		let outputTree = new BroccoliBuilder(broccoliLeasot);
		return outputTree.build().then(function() {
			fixtures.jsMarkers.forEach(checkWithMarkerForGroupByKind);
			fixtures.cssMarkers.forEach(checkWithMarkerForGroupByKind);
			fixtures.hbsMarkers.forEach(checkWithMarkerForGroupByKind);
		});

	});

	it('Imaginary extension lookup', () => {
		setupFixtureTree(true);
		broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
			enabled: true,
			extensions: ['balboa'],
			console: konsole
		});
		let outputTree = new BroccoliBuilder(broccoliLeasot);
		return outputTree.build().then(function() {
			let linkToLeasotDocs = 'https://github.com/pgilad/leasot#supported-languages';
			expect(message).to.include(linkToLeasotDocs);
		});

	});
});