import { USER_FETCH_START, USER_FETCH_NEXT, USER_FETCH_ERROR, USER_SAVE_NEXT, USER_SAVE_ERROR } from './Users.actions';
import { fromJS } from 'immutable';

import { IState, IAction } from '../../base/interfaces';


export const initialState: IState = fromJS({
  entity: null,
  loading: false,
  error: null
});

export const currentUserReducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case USER_FETCH_START:
      return state.merge(fromJS({
        loading: true,
        entity: null,
        error: null
      }));

    case USER_FETCH_NEXT:
      return state.merge(fromJS({
        loading: false,
        entity: action.payload,
        error: null
      }));

    case USER_FETCH_ERROR:
      return state.merge(fromJS({
        loading: false,
        entity: null,
        error: action.payload
      }));

    case USER_SAVE_NEXT:
      return state
        .set('entity', fromJS(action.payload))
        .set('error', null);

    case USER_SAVE_ERROR:
      return state.set('error', action.payload);
  }

  return state;
};
