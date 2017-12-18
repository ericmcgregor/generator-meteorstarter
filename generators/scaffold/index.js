'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  setup() {
    this.props = this.options.props;
    console.log(this.props)
    const startupPath = 'imports/startup/server'
    const dbPath = 'imports/db'
    const reducerPath = 'imports/redux/reducers/index.js'


    //UPDATE REGISTER APIS
    if( !this.fs.exists(this.destinationPath(startupPath+'/register-api.js')) ) {
      this.fs.copyTpl(
        this.templatePath('register-api.js'),
        this.destinationPath(startupPath+'/register-api.js'),
        {
          collectionName: this.props.collectionName,
          collectionVariable:this.props.collectionVariable
        }
      );
    }


    //UPDATE REGISTER LINKS
      if( !this.fs.exists( this.destinationPath(dbPath+'/Links.js') ) ) {
        this.fs.copyTpl(
          this.templatePath('_db/Links.js'),
          this.destinationPath(dbPath+'/Links.js'),
          {
            collectionName: this.props.collectionName,
            collectionVariable:this.props.collectionVariable
          }
        );
      }


    //UPDATE REGISTER EXPOSURES
      if( !this.fs.exists( this.destinationPath(dbPath+'/Exposures.js') ) ) {
        this.fs.copyTpl(
          this.templatePath('_db/Exposures.js'),
          this.destinationPath(dbPath+'/Exposures.js'),
          {
            collectionName: this.props.collectionName,
            collectionVariable:this.props.collectionVariable
          }
        );
      }

    if(this.props.redux) {
      //UPDATE REDUCERS
      if( !this.fs.exists( this.destinationPath(reducerPath) ) ) {
        console.log('scaffolding reducer')
          this.fs.copyTpl(
            this.templatePath('_reducers/index.js'),
            this.destinationPath(reducerPath),
            {
              collectionName: this.props.collectionName,
              collectionVariable:this.props.collectionVariable
            }
          );
        }
    }



  }

  install() {
  }
};
