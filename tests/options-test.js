'use strict';

/* jshint expr: true */
/* Included above statement for chai*/

let chai = require('chai');
let sinonChai = require('sinon-chai');
let BroccoliLeasotFilter = require('../src/index');
let BroccoliBuilder = require('broccoli').Builder;
let fixtureTree = require('broccoli-fixturify');
let fixtures = require('./fixtures');

let expect = chai.expect;
chai.use(sinonChai);


describe('Test defaults & custom values for options passed to Broccoli Leasot', () => {
  let broccoliLeasot;
  let fileTree;

  beforeEach(() => {
    fileTree = fixtureTree({
      app: {
        // css: {
        //   'application.css': fixtures.getCssContent()
        // },
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

    it('Can be overriden', () => {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        groupBy: 'kind'
      });
      let outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.groupBy).to.eql('kind');
    });

    it('Defaults to file when unknown value is passed', () => {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        groupBy: 'siva'
      });
      let outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.groupBy).to.eql('file');
    });

  });

});
