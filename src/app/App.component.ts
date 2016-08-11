import { loggerMiddleware, observableMiddleware } from './base/middleware';
import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HmrStore } from 'angular2-hmr';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select, DevToolsExtension } from 'ng2-redux';

import { rootReducer } from './backend/Root.reducer';
import { RestClient } from './base/restClient';


@Component({
  selector: 'dcs-app',
  templateUrl: './App.tpl.html',
  styles: [
    require('./App.scss').toString()
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [DevToolsExtension, RestClient],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {

  @select(state => state) rootState$: Observable<any>;

  constructor(private store: NgRedux<any>, private devTools: DevToolsExtension) {
    this.setupStore();
  }

  ngOnInit(): void {
    console.log('App init successful!');
    window['app'] = this;
  }

  protected setupStore(): void {
    let middleware: Array<any> = [observableMiddleware];
    let enhancers: Array<any> = [];
    let initialState: any = {};

    if (ENV === 'development') {
      initialState = HmrStore.getState().appState || {};

      middleware = [...middleware, loggerMiddleware];

      if (this.devTools.isEnabled()) {
        // disconnect previous devtools instance, no history walking in dev tools otherwise
        window['devToolsExtension'].disconnect();
        enhancers = [...enhancers, this.devTools.enhancer()];
      }
    }

    this.store.configureStore(rootReducer, initialState, middleware, enhancers);

    if (ENV === 'development') {
      // on every store change update HMR, but debounce for performance reasons
      this.rootState$
        .debounceTime(500)
        .subscribe(() => {
          HmrStore.set('appState', this.store.getState());
        });
    }
  }

}
