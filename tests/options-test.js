'use strict';

/* jshint expr: true */
/* Included above statement for chai*/

var chai = require('chai');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);
var BroccoliLeasotFilter = require('../index');
var BroccoliBuilder = require('broccoli').Builder;
var fixtureTree = require('broccoli-fixturify');
var fixtures = require('./fixtures');


describe('Test defaults & custom values for options passed to Broccoli Leasot', function() {
  var broccoliLeasot;
  var fileTree;

  beforeEach(function() {
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

  describe('Enabled option', function() {

    it('Should be disabled by default', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree);
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.enabled).to.be.false;
    });


    it('Can be enabled by passing an option', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        enabled: true
      });
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.enabled).to.be.true;
    });
  });

  describe('Kinds option', function() {

    it('Should have defaults', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree);
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.kinds).to.eql(['TODO', 'FIXME']);
    });

    it('Can be overriden', function() {
      var customKinds = ['SIVAKUMAR', 'KAILASAM'];
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        kinds: customKinds
      });
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.kinds).to.eql(customKinds);
    });

  });

  describe('Extensions option', function() {

    it('Should have defaults', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree);
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.extensions).to.exist;
      expect(outputTree.tree.extensions).to.include('js', 'css', 'hbs', 'handlebars');
    });

    it('Can be overriden', function() {
      var customExtensions = ['dat', 'sak'];
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        extensions: customExtensions
      });
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.extensions).to.eql(customExtensions);
    });

  });

  describe('Group by option', function() {

    it('Should have defaults', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree);
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.groupBy).to.exist;
      expect(outputTree.tree.groupBy).to.be.equal('file');
    });

    it('Can be overriden', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        groupBy: 'kind'
      });
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.groupBy).to.eql('kind');
    });

    it('Defaults to file when unknown value is passed', function() {
      broccoliLeasot = new BroccoliLeasotFilter(fileTree, {
        groupBy: 'siva'
      });
      var outputTree = new BroccoliBuilder(broccoliLeasot);
      expect(outputTree.tree.groupBy).to.eql('file');
    });

  });

});
