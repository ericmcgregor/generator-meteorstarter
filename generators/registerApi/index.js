'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.props = this.options.props;
  }

  prompting() {
    // Have Yeoman greet the user.
  }


  registerApi() {
      const startupPath = 'imports/startup/server'

      let registerapipath = this.destinationPath(startupPath+'/register-api.js'),
      hook   = '// IMPORT APIS',
      collectionName = this.props.collectionName,
      pubs = "import '../../api/"+collectionName+"/server/publications.js';",
      meth = "import '../../api/"+collectionName+"/methods.js';",
      newContent = this.fs.read(registerapipath);

      if (newContent.indexOf(pubs) === -1) {
        newContent = newContent.replace(hook, '\n'+pubs+'\n'+hook);
      }
      if (newContent.indexOf(meth) === -1) {
        newContent = newContent.replace(hook, meth+'\n'+hook);
      }
      this.fs.write(registerapipath, newContent);
  }

  registerLinks(){
    const dbPath = 'imports/db'

    let registerLinksPath = this.destinationPath(dbPath+'/Links.js'),

    hook   = '// IMPORT LINKS',
    collectionName = this.props.collectionName,
    links = "import '../api/"+collectionName+"/db/"+collectionName+".links'",
    newContent = this.fs.read(registerLinksPath);

    if (newContent.indexOf(links) === -1) {
      newContent = newContent.replace(hook, links+'\n'+hook);
    }
    this.fs.write(registerLinksPath, newContent);
  }

  registerExposures(){
    const dbPath = 'imports/db'
    let registerExposuresPath = this.destinationPath(dbPath+'/Exposures.js'),
    hook   = '// IMPORT EXPOSURES',
    collectionName = this.props.collectionName,
    links = "import '../api/"+collectionName+"/db/"+collectionName+".expose'",
    newContent = this.fs.read(registerExposuresPath);

    if (newContent.indexOf(links) === -1) {
      newContent = newContent.replace(hook, links+'\n'+hook);
    }
    this.fs.write(registerExposuresPath, newContent);
  }

  registerReducers(){
    if(this.props.redux) {
      console.log(this.props.redux)
      const reducerPath = 'imports/redux/reducers/index.js'

      let file = this.destinationPath(reducerPath),

      hook   = '// IMPORT REDUCER',
      addHook = '// ADD REDUCER',
      collectionName = this.props.collectionName,
      importString = "import "+collectionName+" from '../"+collectionName+"/"+collectionName+"Reducers'",
      addString = collectionName+",",
      newContent = this.fs.read(file);

      if (newContent.indexOf(importString) === -1) {
        newContent = newContent.replace(hook, importString+'\n'+hook);
      }
      if (newContent.indexOf(addString) === -1) {
        newContent = newContent.replace(addHook, addString+'\n'+addHook);
      }
      this.fs.write(file, newContent);
    }
  }

  install() {
  }
};
