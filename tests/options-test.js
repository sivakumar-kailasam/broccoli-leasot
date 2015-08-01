/* jshint expr: true */
/* Included above statement for chai*/

import chai from 'chai';
import sinonChai from 'sinon-chai';
import {
	Builder as BroccoliBuilder
}
from 'broccoli';
import fixtureTree from 'broccoli-fixturify';
import fixtures from './fixtures';
import BroccoliLeasotFilter from '../src/index';

let expect = chai.expect;
chai.use(sinonChai);

describe('Test defaults & custom values for options passed to Broccoli Leasot', () => {
	let broccoliLeasot;
	let fileTree;

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
					'application.hbs': fixtures.getHbsContent(),
					'index.handlebars': fixtures.getHbsContent()
				}
			}
		});
	});

	describe('Enabled option', () => {

		it('Should be disabled by default', () => {
			broccoliLeasot = new BroccoliLeasotFilter(fileTree);
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.enabled).to.be.false;
		});


		it('Can be enabled by passing an option', () => {
			broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
				enabled: true
			});
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.enabled).to.be.true;
		});
	});

	describe('Kinds option', () => {

		it('Should have defaults', () => {
			broccoliLeasot = new BroccoliLeasotFilter(fileTree);
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.kinds).to.eql(['TODO', 'FIXME']);
		});

		it('Can be overriden', () => {
			let customKinds = ['SIVAKUMAR', 'KAILASAM'];
			broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
				kinds: customKinds
			});
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.kinds).to.eql(customKinds);
		});

	});

	describe('Extensions option', () => {

		it('Should have defaults', () => {
			broccoliLeasot = new BroccoliLeasotFilter(fileTree);
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.extensions).to.exist;
			expect(outputTree.tree.extensions).to.include('js', 'css', 'hbs', 'handlebars');
		});

		it('Can be overriden', () => {
			let customExtensions = ['dat', 'sak'];
			broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
				extensions: customExtensions
			});
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.extensions).to.eql(customExtensions);
		});

	});

	describe('Group by option', () => {

		it('Should have defaults', () => {
			broccoliLeasot = new BroccoliLeasotFilter(fileTree);
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.groupBy).to.exist;
			expect(outputTree.tree.groupBy).to.be.equal('file');
		});

		let testGroupByOption = (criteria, valueToCheckAgainst) => {
			broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
				groupBy: criteria
			});
			let outputTree = new BroccoliBuilder(broccoliLeasot);
			expect(outputTree.tree.groupBy).to.eql(valueToCheckAgainst);
		};

		it('Can be overriden', () => {
			testGroupByOption('kind', 'kind');
		});

		it('Defaults to file when unknown value is passed', () => {
			testGroupByOption('siva', 'file');
		});

	});

});