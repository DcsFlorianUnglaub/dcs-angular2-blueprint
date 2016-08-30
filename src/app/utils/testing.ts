import { Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as configureStore from 'redux-mock-store';

import { observableMiddleware } from '../base/middleware';

// demo for tslint - give it an error to display
const foo: number = 42;

const middlewares = [observableMiddleware];
export const createMockStore: Function = configureStore(middlewares);

export class FakeRestClient {

  public path: string;
  public options: any;
  public body: any;

  get(path: string, options: any = {}): Observable<any> {
    this.path = path;
    this.options = options;
    return Observable.of('fake payload');
  }

  post(path: string, body: any, options: any = {}): Observable<any> {
    this.path = path;
    this.options = options;
    this.body = body;
    return Observable.of('fake payload');
  }

  put(path: string, body: any, options: any = {}): Observable<any> {
    this.path = path;
    this.body = body;
    return Observable.of('fake payload');
  }

  delete(path: string, options: any = {}): Observable<any> {
    this.path = path;
    this.options = options;
    return Observable.of('fake payload');
  }

}

class DummyComponent { }

export const dummyRoutes: Routes = [
  {
    path: '**', component: DummyComponent
  }
];
