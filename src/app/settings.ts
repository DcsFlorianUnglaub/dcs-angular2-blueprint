import { OpaqueToken } from '@angular/core';


export interface ISettings {
  apiUrl: string;
}

export const APP_SETTINGS: OpaqueToken = new OpaqueToken('APP_SETTINGS');


let settings: ISettings;

// little hack to allow overriding of settings on production machines
// just add the settings to window
if (window['settings']) {
  settings = window['settings'];
} else {
  settings = {
    apiUrl: '//localhost:3001',
  };
}

export { settings };
export default settings;
