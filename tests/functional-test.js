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

	beforeEach(() => {
		fileTree = fixtureTree({
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
		});
	});

	afterEach(() => {
		message = '';
	});

	it('Should work', () => {

		broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
			enabled: true,
			kinds: ['TODO', 'FIXME', 'CUSTOM_TAG'],
			console: konsole
		});
		let outputTree = new BroccoliBuilder(broccoliLeasot);
		return outputTree.build().then(function() {
			let checkWithMarker = (marker) => {
				expect(message).to.include(marker.trim());
			};

			fixtures.jsMarkers.forEach(checkWithMarker);
			fixtures.cssMarkers.forEach(checkWithMarker);
			fixtures.hbsMarkers.forEach(checkWithMarker);
		});

	});
});