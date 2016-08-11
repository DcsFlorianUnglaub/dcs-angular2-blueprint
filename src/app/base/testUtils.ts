import { Observable } from 'rxjs/Observable';
import * as configureStore from 'redux-mock-store';

import { observableMiddleware } from './middleware';

// demo for tslint - give it an error to display
const foo: number = 42;

const middlewares = [observableMiddleware]; // add your middlewares like `redux-thunk`
export const createMockStore: Function = configureStore(middlewares);

export class FakeRestClient {

  get(path: string, options: any = {}): Observable<any> {
    return Observable.of('fake payload');
  }

  post(path: string, body: any, options: any = {}): Observable<any> {
    return Observable.of('fake payload');
  }

  put(path: string, body: any, options: any = {}): Observable<any> {
    return Observable.of('fake payload');
  }

  delete(path: string, options: any = {}): Observable<any> {
    return Observable.of('fake payload');
  }

}
