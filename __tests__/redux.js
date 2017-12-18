'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-meteorstarter:redux', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/redux'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
