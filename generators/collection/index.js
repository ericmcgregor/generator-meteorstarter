'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Lets make a collection'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'collectionName',
        message: 'mongo collection name (plural, lowercase)',
        //Defaults to the project's folder name if the input is skipped
        default: "defaults"
      },
      {
        type: 'confirm',
        name: 'redux',
        message: 'Add a redux collection?',
        default: true
      },
      {
        type: 'confirm',
        name: 'collectionContainer',
        message: 'Add a UI Container?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.collectionVariable = jsUcfirst(props.collectionName)
      this.props = props;
    });

  }



  createApi() {


    const apiPath = 'imports/api/'+this.props.collectionName

    this.fs.copyTpl(
      this.templatePath('_collection/db/_collection.expose.js'),
      this.destinationPath(apiPath+'/db/'+this.props.collectionName+'.expose.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );

    this.fs.copyTpl(
      this.templatePath('_collection/db/_collection.links.js'),
      this.destinationPath(apiPath+'/db/'+this.props.collectionName+'.links.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );


    this.fs.copyTpl(
      this.templatePath('_collection/db/_collection.queries.js'),
      this.destinationPath(apiPath+'/db/'+this.props.collectionName+'.queries.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );



    this.fs.copyTpl(
      this.templatePath('_collection/server/publications.js'),
      this.destinationPath(apiPath+'/server/publications.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );

    this.fs.copyTpl(
      this.templatePath('_collection/_collection.js'),
      this.destinationPath(apiPath+'/'+this.props.collectionName+'.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );

    this.fs.copyTpl(
      this.templatePath('_collection/methods.js'),
      this.destinationPath(apiPath+'/methods.js'),
      {
        collectionName: this.props.collectionName,
        collectionVariable:this.props.collectionVariable
      }
    );

  }

  scaffolding(){
    this.composeWith(require.resolve('../scaffold'), {props:this.props});
  }

  linking(){
    this.composeWith(require.resolve('../registerApi'), {props:this.props});
    //
    if(this.props.redux) {
      this.composeWith(require.resolve('../redux'), {props:this.props});
    }
  }

  ui(){
    if(this.props.collectionContainer) {
      this.composeWith(require.resolve('../collectioncontainer'), {props:this.props});
    }
  }


  install() {
  }
};
