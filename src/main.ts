import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { NgRedux } from 'ng2-redux';

import { AppModule } from './app/App.module';
import { AppComponent } from './app/App.component';
import { appRouterProviders } from './app/App.routes';

export function main(initialHmrState?: any): Promise<any> {

  return platformBrowserDynamic().bootstrapModule(AppModule);


  // return bootstrap(AppComponent, [
  //   disableDeprecatedForms(),
  //   provideForms(),
  //   NgRedux,
  //   HTTP_PROVIDERS,
  //   appRouterProviders
  // ])
  // .catch(err => console.error(err));
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
