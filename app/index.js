'use strict';
const yeoman = require('yeoman-generator');
const _s = require('underscore.string');

module.exports = yeoman.Base.extend({
  init() {
    const cb = this.async();
    const self = this;

    this.prompt([{
      name: 'moduleName',
      message: 'What do you want to name your module?',
      default: this.appname.replace(/\s/g, '-'),
      filter: x => _s.slugify(x),
    }], props => {
      const tpl = {
        moduleName: props.moduleName,
        camelModuleName: _s.camelize(props.moduleName),
        year: new Date().getFullYear(),
      };

      const mv = (from, to) => {
        self.fs.move(self.destinationPath(from), self.destinationPath(to));
      };

      self.fs.copyTpl(
        self.templatePath(),
        self.destinationPath(),
        tpl);

      mv('editorconfig', '.editorconfig');
      mv('gitattributes', '.gitattributes');
      mv('gitignore', '.gitignore');
      mv('travis.yml', '.travis.yml');
      mv('_package.json', 'package.json');

      cb();
    });
  },
  git() {
    this.spawnCommandSync('git', ['init']);
  },
  install() {
    this.installDependencies({ bower: false });
  },
});
