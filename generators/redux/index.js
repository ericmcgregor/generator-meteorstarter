'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.props = this.options.props;

  }

  create() {
    const reduxPath = 'imports/redux/'+this.props.collectionName

    this.fs.copyTpl(
      this.templatePath('_redux/_collectionActions.js'),
      this.destinationPath(reduxPath+'/'+this.props.collectionName+'Actions.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );


    this.fs.copyTpl(
      this.templatePath('_redux/_collectionReducers.js'),
      this.destinationPath(reduxPath+'/'+this.props.collectionName+'Reducers.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );
  }



  install() {
  }
};
