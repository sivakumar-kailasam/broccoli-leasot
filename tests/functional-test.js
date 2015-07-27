'use strict';

/* jshint expr: true */
/* Included above statement for chai*/

import chai from 'chai';
import sinonChai from 'sinon-chai';
// import {
//   Builder as BroccoliBuilder
// } from 'broccoli';
// import fixtureTree from 'broccoli-fixturify';
// import fixtures from './fixtures';
// import BroccoliLeasotFilter from '../src/index';

let expect = chai.expect;
chai.use(sinonChai);

describe('Functional test suite for Broccoli Leasot', () => {
  it('Should work', ()=> {
    expect(true).to.be.true;
  });
});
