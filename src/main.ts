import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/App.module';

export function main(initialHmrState?: any): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if ('development' === ENV) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  enableProdMode();
  document.addEventListener('DOMContentLoaded', () => main());
}
