import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HmrStore } from 'angular2-hmr';
import { NgRedux, select, DevToolsExtension } from 'ng2-redux';
import { combineReducers } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Map } from 'immutable';

function companyReducer(state: Map<string, any> = Map({ name: 'Unknown Inc.' }), action: any) {
  switch (action.type) {
    case 'SET_COMPANY':
      return state.set('name', action.payload);
    case 'RESET_COMPANY':
      return state.set('name', 'Unknown Inc');
    default:
      return state;
  }
}

const rootReducer: any = combineReducers({
  company: companyReducer
});

@Component({
  selector: 'dcs-app',
  templateUrl: './App.tpl.html',
  styleUrls: ['./App.css'],
  providers: [DevToolsExtension]
})
export class AppComponent implements OnInit {

  @select(['company', 'name']) companyName$: Observable<string>;

  setCompanyName$: Observable<any> = new Subject().map(name => ({
    type: 'SET_COMPANY',
    payload: name
  }));

  resetCompanyName$: Observable<any> = new Subject().map(name => ({
    type: 'RESET_COMPANY'
  }));

  constructor(private ngRedux: NgRedux<any>, private devTools: DevToolsExtension) {
    this.setupStore();
  }

  ngOnInit() {
    console.log('App init successful!');

    Observable.merge(
      this.setCompanyName$,
      this.resetCompanyName$
    ).subscribe((action) => {
      this.ngRedux.dispatch(action);
    });
  }

  protected setupStore(): void {
    let enhancers: Array<any> = [];
    let initialState: any = {};

    if (ENV === 'development') {
      initialState = HmrStore.getState().appState || {};

      if (this.devTools.isEnabled()) {
        enhancers = [...enhancers, this.devTools.enhancer()];
      }
    }

    this.ngRedux.configureStore(rootReducer, initialState, [], enhancers);

    if (ENV === 'development') {
      // on every store change update HMR
      this.ngRedux.subscribe(() => {
        HmrStore.set('appState', this.ngRedux.getState());
      });
    }
  }

}
