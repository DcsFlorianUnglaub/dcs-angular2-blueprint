import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Response } from '@angular/http';
import { HmrStore } from 'angular2-hmr';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select, DevToolsExtension } from 'ng2-redux';
import * as createLogger from 'redux-logger';
import { Iterable } from 'immutable';

import { rootReducer } from './backend/Root.reducer';
import { RestClient } from './base/restClient';

const observableMiddleware: any = store => next => action => {
  if (action.payload instanceof Observable) {
    let baseType: string = action.type;
    let obs: Observable<any> = action.payload;

    store.dispatch({ type: `${baseType}_START` });

    obs.subscribe(
      (data: any) => store.dispatch({ type: `${baseType}_NEXT`, payload: data }),
      (error: Response) => store.dispatch({ type: `${baseType}_ERROR`, payload: error }),
      () => store.dispatch({ type: `${baseType}_COMPLETED` })
    );

  } else {
   return next(action);
  }
};

const loggerMiddleware: any = createLogger({
  stateTransformer: (state) => {
    let newState = {};

    for (let i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };

    return newState;
  }
});


@Component({
  selector: 'dcs-app',
  templateUrl: './App.tpl.html',
  styleUrls: ['./App.css'],
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
    let middleware: Array<any> = [];
    let enhancers: Array<any> = [];
    let initialState: any = {};

    if (ENV === 'development') {
      initialState = HmrStore.getState().appState || {};

      middleware = [...middleware, observableMiddleware, loggerMiddleware];

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
        .debounceTime(1000)
        .subscribe(() => {
          HmrStore.set('appState', this.store.getState());
        });
    }
  }

}
