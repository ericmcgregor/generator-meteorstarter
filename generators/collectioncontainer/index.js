'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const pluralize = require('pluralize')

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.props = this.options.props || {}

    this.log(yosay(
      'Welcome to the well-made ' + chalk.red('generator-meteorstarter') + ' generator!'
    ));


    let prompts = [
      {
        type: 'input',
        name: 'collectionName',
        message: 'mongo collection name (plural, lowercase)',
        //Defaults to the project's folder name if the input is skipped
        default: "defaults",
        when:(answers)=>{
          return !this.props.collectionName
        }
      },
      {
        type:'list',
        name:'containerType',
        message:"what type of collection wrppaer do you want",
        choices:['redux','grapher']
      },
      {
        type:'list',
        name:'containerData',
        message:"what kind of data do you need",
        choices:['all','detail','search']
      },
      {
        type:'input',
        name:'containerName',
        message:"Would you like to give this a unqiue name",
        default:""
      },
    ];


    return this.prompt(prompts).then(props => {
      Object.assign(props, this.props);
      // To access props later use this.props.someAnswer;
      if(!props.collectionVariable) {
        props.collectionVariable = jsUcfirst(props.collectionName)
      }
      if(props.containerName=="") {
        props.containerName=props.collectionVariable+"Container"+jsUcfirst(props.containerData);
      }
      props.collectionNameSingle = pluralize.singular(props.collectionName)

      this.props = props;
    });
  }

  writing() {
    const collectionwrapperpath = 'imports/ui/components/containers/'+this.props.collectionVariable
    const containerName = this.props.containerName || this.props.collectionVariable+'Container';


    switch (this.props.containerType+'-'+this.props.containerData) {
      case 'redux-all':
          this.fs.copyTpl(
            this.templatePath('_CollectionContainerRedux.js'),
            this.destinationPath(collectionwrapperpath+'/'+containerName+'Redux.js'),
            {
              collectionName: this.props.collectionName,
              collectionVariable:this.props.collectionVariable,
              containerName,
              collectionNameSingle:this.props.collectionNameSingle
            }
          );
        break;

        case 'redux-detail':
            this.fs.copyTpl(
              this.templatePath('_CollectionContainerDetailRedux.js'),
              this.destinationPath(collectionwrapperpath+'/'+containerName+'Redux.js'),
              {
                collectionName: this.props.collectionName,
                collectionVariable:this.props.collectionVariable,
                containerName,
                collectionNameSingle:this.props.collectionNameSingle
              }
            );
          break;

        case 'grapher-all':
            this.fs.copyTpl(
              this.templatePath('_CollectionContainerGrapher.js'),
              this.destinationPath(collectionwrapperpath+'/'+containerName+'Grapher.js'),
              {
                collectionName: this.props.collectionName,
                collectionVariable:this.props.collectionVariable,
                containerName
              }
            );
          break;

        case 'grapher-detail':
            this.fs.copyTpl(
              this.templatePath('_CollectionContainerDetailGrapher.js'),
              this.destinationPath(collectionwrapperpath+'/'+containerName+'Grapher.js'),
              {
                collectionName: this.props.collectionName,
                collectionVariable:this.props.collectionVariable,
                containerName,
                collectionNameSingle:this.props.collectionNameSingle
              }
            );
          break;

      default:

    }



  }

  install() {
  }
};
