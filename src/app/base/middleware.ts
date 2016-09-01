import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import * as createLogger from 'redux-logger';

import { IState } from './interfaces';


let subscriptions: Array<Subscription> = [];

export const observableMiddleware: any = store => next => action => {
  // get rid of all subscriptions that are closed anyway, no need to unsubscribe there
  subscriptions = subscriptions.filter(sub => !sub.closed);

  if (action.type === 'HMR_RESET_STATE') {
    // cancel all async actions on state reset via HMR
    subscriptions.forEach(sub => sub.unsubscribe());
  }

  if (action.payload instanceof Observable) {
    let baseType: string = action.type;
    let obs: Observable<any> = action.payload;

    store.dispatch({ type: `${baseType}_START` });

    subscriptions.push(obs.subscribe(
      (data: any) => store.dispatch({ type: `${baseType}_NEXT`, payload: data }),
      (error: Response) => store.dispatch({ type: `${baseType}_ERROR`, payload: error }),
      () => store.dispatch({ type: `${baseType}_COMPLETED` })
    ));

  } else {
    return next(action);
  }
};

export const loggerMiddleware: any = createLogger({
  stateTransformer: (state: IState) => state.toJS()
});
