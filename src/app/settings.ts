let settings: any;

// little hack to allow overriding of settings on production machines
// just add the settings to window
/* tslint:disable */
if (window['settings']) {
  settings = window['settings'];
} else {
  settings = {
    apiUrl: '//localhost:3001',
  };
}

export default settings;
