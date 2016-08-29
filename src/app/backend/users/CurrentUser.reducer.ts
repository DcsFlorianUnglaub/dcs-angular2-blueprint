import { fromJS } from 'immutable';

import { IState, IAction, IReducer } from '../../base/interfaces';
import { createReducer } from '../../utils/reducer';
import { USER_FETCH_START, USER_FETCH_NEXT, USER_FETCH_ERROR,
  USER_SAVE_START, USER_SAVE_NEXT, USER_SAVE_ERROR } from './Users.actions';


export const currentUserInitialState: IState = fromJS({
  entity: null,
  loading: false,
  error: null
});

export const currentUserReducer: IReducer = createReducer(currentUserInitialState, {
  [USER_FETCH_START](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      loading: true,
      entity: null,
      error: null,
      saving: false
    }));
  },

  [USER_FETCH_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      loading: false,
      entity: action.payload,
      error: null
    }));
  },

  [USER_FETCH_ERROR](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      loading: false,
      entity: null,
      error: action.payload
    }));
  },

  [USER_SAVE_START](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      saving: true
    }));
  },

  [USER_SAVE_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entity: fromJS(action.payload),
      error: null,
      saving: false
    }));
  },

  [USER_SAVE_ERROR](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      error: action.payload,
      saving: false
    }));
  }

});
