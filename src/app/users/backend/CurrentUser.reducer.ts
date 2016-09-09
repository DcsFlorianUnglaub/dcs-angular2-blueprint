import { fromJS } from 'immutable';

import { IState, IAction, IReducer } from '../../shared/interfaces';
import { createReducer } from '../../utils/reducer';
import {
  USER_FETCH_START, USER_FETCH_NEXT, USER_FETCH_ERROR,
  USER_SAVE_START, USER_SAVE_NEXT, USER_SAVE_ERROR,
  USER_UPDATE_FORM_DATA, USER_RESET_FORM_DATA
 } from './Users.actions';


export const currentUserInitialState: IState = fromJS({
  entity: null,
  formData: {},
  formDirty: false,
  loading: false,
  error: null,
  saving: false
});

export const currentUserReducer: IReducer = createReducer(currentUserInitialState, {
  [USER_FETCH_START](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entity: null,
      formData: {},
      loading: true,
      error: null,
      saving: false
    }));
  },

  [USER_FETCH_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      loading: false,
      entity: action.payload,
      formData: action.payload,
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
    let entity = fromJS(action.payload);

    return state.merge(fromJS({
      entity: entity,
      formData: entity,
      formDirty: false,
      error: null,
      saving: false
    }));
  },

  [USER_SAVE_ERROR](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      error: action.payload,
      saving: false
    }));
  },

  [USER_UPDATE_FORM_DATA](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      formData: action.payload.formData,
      formDirty: action.payload.dirty
    }));
  },

  [USER_RESET_FORM_DATA](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      formData: {},
      formDirty: false
    }));
  }

});
