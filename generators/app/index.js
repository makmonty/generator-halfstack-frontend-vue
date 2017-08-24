var Generator = require('yeoman-generator');
var extend = require('extend');
var slug = require('slug');

module.exports = class extends Generator {

  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Defaults
    this.answers = {
      appName: '',
      useApi: false,
      userSystem: false,
      bootstrap: false
    };
  }

  prompting() {
    return this
      .prompt([{
        type: 'input',
        name: 'appName',
        message: 'Project name'
      }, {
        type: 'confirm',
        name: 'useApi',
        message: 'Will you connect to an API?'
      }, {
        type: 'confirm',
        name: 'userSystem',
        message: 'Would you like a user system?',
        store: true,
        when: (answers) => answers.useApi
      }, {
        type: 'input',
        name: 'backendBaseUrl',
        message: 'Base backend URL',
        default: 'http://localhost',
        store: true,
        when: (answers) => answers.useApi
      }, {
        type: 'input',
        name: 'apiPath',
        message: 'API path',
        default: '/api/v1',
        store: true,
        when: (answers) => answers.useApi
      // }, {
      //   type: 'confirm',
      //   name: 'bootstrap',
      //   message: 'Use bootstrap?',
      //   store: true
      }])
      .then((answers) => {
        extend(this.answers, answers);
        this.answers.appSlug = slug(this.answers.appName).toLowerCase();
      });
  }

  writing() {
    let promises = [];

    // Copy common files
    promises.push(this.fs.copyTpl(
      this.templatePath('src/*'),
      this.destinationPath('src'),
      this.answers
    ));
    promises.push(this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath(),
      this.answers
    ));
    promises.push(this.fs.copyTpl(
      this.templatePath('src/config/**/*'),
      this.destinationPath('src/config'),
      this.answers
    ));
    promises.push(this.fs.copyTpl(
      this.templatePath('src/components/**/!(login|admin)*'),
      this.destinationPath('src/components'),
      this.answers
    ));

    // Files that should exist only if useApi
    if (this.answers.useApi) {
      promises.push(this.fs.copyTpl(
        this.templatePath('src/services/**/!(me.js)'),
        this.destinationPath('src/services'),
        this.answers
      ));
    }

    // Files that should exist only if userSystem
    if (this.answers.userSystem) {
      promises.push(this.fs.copyTpl(
        this.templatePath('src/services/me.*'),
        this.destinationPath('src/services'),
        this.answers
      ));
      promises.push(this.fs.copyTpl(
        this.templatePath('src/components/**/*(login*|admin*)'),
        this.destinationPath('src/components'),
        this.answers
      ));
      promises.push(this.fs.copyTpl(
        this.templatePath('src/api-resources/user*'),
        this.destinationPath('src/api-resources'),
        this.answers
      ));
      promises.push(this.fs.copyTpl(
        this.templatePath('src/store/**/*'),
        this.destinationPath('src/store'),
        this.answers
      ));
    }
    return Promise.all(promises);
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
