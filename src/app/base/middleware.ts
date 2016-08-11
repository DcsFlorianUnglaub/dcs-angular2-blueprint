import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import * as createLogger from 'redux-logger';
import { Iterable } from 'immutable';


export const observableMiddleware: any = store => next => action => {
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

export const loggerMiddleware: any = createLogger({
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
