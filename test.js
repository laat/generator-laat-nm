/* eslint-env mocha */
'use strict';
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('laat-nm:app', function () {
  it('generates expected files', function (done) {
    helpers.run(path.join(__dirname, './app'))
      .inTmpDir()
      .withOptions({ 'skip-install': true })
      .withPrompts({
        moduleName: 'test',
        githubUsername: 'test',
        website: 'test.com',
        cli: false,
      })
      .on('end', function () {
        assert.file([
          '.editorconfig',
          '.git',
          '.gitattributes',
          '.gitignore',
          '.travis.yml',
          'index.js',
          'license',
          'package.json',
          'readme.md',
          'test.js',
        ]);

        done();
      });
  });
});
