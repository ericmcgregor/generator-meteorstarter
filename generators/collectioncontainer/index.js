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
    this.props = this.options.props || {}

    this.log(yosay(
      'Welcome to the well-made ' + chalk.red('generator-meteorstarter') + ' generator!'
    ));


    let prompts = [
      {
        type:'list',
        name:'containerType',
        message:"what type of collection wrppaer do you want",
        choices:['redux','grapher']
      },
      {
        type:'input',
        name:'containerName',
        message:"Would you like to give this a unqiue name",
        default:""
      },
    ];

    if(!this.props.collectionName){
      prompts = [
        {
          type: 'input',
          name: 'collectionName',
          message: 'mongo collection name (plural, lowercase)',
          //Defaults to the project's folder name if the input is skipped
          default: "defaults"
        },
        ...prompts
      ]
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      if(!this.props.collectionVariable) {
        props.collectionVariable = jsUcfirst(props.collectionName)
      }
      if(!props.containerName) {
        props.containerName=props.collectionVariable+"Container";
      }
      this.props = props;
    });
  }

  writing() {
    const collectionwrapperpath = 'imports/ui/components/containers/'+this.props.collectionVariable
    const containerName = this.props.containerName || this.props.collectionVariable+'Container';
    switch (this.props.containerType) {
      case 'redux':
          this.fs.copyTpl(
            this.templatePath('_CollectionContainerRedux.js'),
            this.destinationPath(collectionwrapperpath+'/'+containerName+'Redux.js'),
            {
              collectionName: this.props.collectionName,
              collectionVariable:this.props.collectionVariable,
              containerName
            }
          );
        break;

        case 'grapher':
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

      default:

    }



  }

  install() {
  }
};
