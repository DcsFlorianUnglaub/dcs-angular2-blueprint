import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef, enableProdMode } from '@angular/core';
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { fromJS, Map } from 'immutable';

import { AppComponent } from './app/App.component';
import { AppModule } from './app/App.module';
import { IState } from './app/base/interfaces';
import { loggerMiddleware, observableMiddleware } from './app/base/middleware';
import { rootReducer } from './app/backend/Root.reducer';


console.time('bootstrap');

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular 2
    RouterModule.forRoot([], {
      useHash: true
    }),
    // app
    AppModule
    // vendors
  ],
  providers: [
    NgRedux,
    DevToolsExtension
  ]
})
class MainModule {
    constructor(
    private appRef: ApplicationRef,
    private store: NgRedux<IState>,
    private devTools: DevToolsExtension
  ) {
    if (!module.hot) {
      this.setupStore();
    }
  }

  hmrOnInit(hmrStore) {
    this.setupStore(hmrStore);
  }

  hmrOnDestroy(hmrStore) {
    // store app state right before hot reload
    hmrStore.appState = this.store.getState();

    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    hmrStore.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(hmrStore) {
    // display new elements
    hmrStore.disposeOldHosts();
    delete hmrStore.disposeOldHosts;
  }

  protected setupStore(hmrStore: { appState: IState } = { appState: Map({}) }): void {
    let middleware: Array<any> = [observableMiddleware];
    let enhancers: Array<any> = [];
    let initialState = hmrStore.appState;
    let tickTimeoutId: any;

    if (ENV === 'development') {
      middleware = [...middleware, loggerMiddleware];

      if (this.devTools.isEnabled()) {
        // disconnect previous devtools instance, no history walking in dev tools otherwise
        window['devToolsExtension'].disconnect();
        enhancers = [...enhancers, this.devTools.enhancer({
          deserializeState: ((state: IState) => {

            clearTimeout(tickTimeoutId);
            tickTimeoutId = setTimeout(() => {
              console.log('State restored, calling change detection.');
              this.appRef.tick();
            }, 100);
            return fromJS(state);
          })
        })];
      }
    }

    this.store.configureStore(rootReducer, initialState, middleware, enhancers);
  }

}

export function main() {
  if (ENV === 'production') {
    enableProdMode();
  }
  return platformBrowserDynamic().bootstrapModule(MainModule);
}

// boot on document ready
bootloader(main);
