import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { AppComponent } from './app/App.component';

export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(AppComponent, [
    NgRedux
  ])
  .catch(err => console.error(err));
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
