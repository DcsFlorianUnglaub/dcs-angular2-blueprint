require('ts-node/register');
var helpers = require('./helpers');

exports.config = {
  baseUrl: 'http://localhost:3000/',

  specs: [
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
    }
  },

  onPrepare: function () {
    // http://stackoverflow.com/questions/27219335/protractor-angularjs-parse-protractor-does-not-wait-for-angular-to-resolve
    browser.ignoreSynchronization = false;
  },

  useAllAngular2AppRoots: true,
  rootElement: 'dcs-app'
};
