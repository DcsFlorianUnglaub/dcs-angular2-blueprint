import { NgModule, ApplicationRef, enableProdMode, Inject, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { fromJS, Map } from 'immutable';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from './app/App.component';
import { SharedModule } from './app/shared/Shared.module';
import { AppModule } from './app/App.module';
import { IReducer, IState } from './app/shared/interfaces';
import { loggerMiddleware, observableMiddleware, tickEnhancer } from './app/shared/middleware';
import { rootReducer, RootReducer } from './app/backend/Root.reducer';
import { SetupCompletedGuard, SetupCompleted, getSetupCompletedTimer } from './app/shared/guards/SetupCompleted.guard';

if (module.hot && ENV === 'development') {
  console.clear();
}
console.time('bootstrap');

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    // app
    SharedModule,
    AppModule,
    // vendors
    NgReduxModule
  ],
  providers: [
    { provide: RootReducer, useValue: rootReducer },
    { provide: SetupCompleted, useValue: getSetupCompletedTimer() },
    SetupCompletedGuard
  ]
})
class MainModule {
  constructor(
    private appRef: ApplicationRef,
    private store: NgRedux<IState>,
    private devTools: DevToolsExtension,
    private zone: NgZone,
    @Inject(RootReducer) private rootReducer: IReducer,
    @Inject(SetupCompleted) private setupCompleted$: Subject<boolean>
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

  protected setupStore(hmrStore?): void {
    let middleware: Array<any> = [observableMiddleware];
    let enhancers: Array<any> = [tickEnhancer(this.zone)];
    let initialState = Map({});
    let tickTimeoutId: any;

    if (ENV === 'development') {
      middleware = [...middleware, loggerMiddleware];

      // if present, fetch initial state from HMR
      if (hmrStore && hmrStore.appState) {
        initialState = hmrStore.appState;
      }

      // configure devtools if installed in Chrome
      if (this.devTools.isEnabled()) {
        // disconnect previous devtools instance, no history walking in dev tools otherwise
        window['devToolsExtension'].disconnect();
        enhancers = [...enhancers, this.devTools.enhancer({
          deserializeState: ((state: IState) => {
            // this is for loading the state via devtols from a JSON dump
            clearTimeout(tickTimeoutId);
            tickTimeoutId = setTimeout(() => {
              console.log('State restored, calling change detection.');
              // fire change detection
              this.zone.run(() => { });
            }, 100);
            return fromJS(state);
          })
        })];
      }
    }

    this.store.configureStore(this.rootReducer, initialState, middleware, enhancers);
    this.setupCompleted$.next(true);
    // fire change detection
    this.zone.run(() => { });
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
