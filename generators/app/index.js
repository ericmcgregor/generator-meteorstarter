'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');


module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper ' + chalk.red('generator-meteorstarter') + ' generator!'
    ));


  }

  writing() {

    // this.composeWith(require.resolve('../collection'), {collectionName:this.props.collectionName});

  }

  install() {
    // this.installDependencies();
  }
};
