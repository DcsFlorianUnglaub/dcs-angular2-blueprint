import { fromJS } from 'immutable';

import { IAction, IReducer, IState } from '../../base/interfaces';
import { createReducer } from '../../utils/reducer';
import {
  MEALS_FETCH_START, MEALS_FETCH_NEXT, MEALS_FETCH_ERROR,
  MEALS_SET_SEARCH_FILTER, MEALS_SET_GROUP_FILTER, MEALS_RESET_SEARCH,
  MEALS_UPDATE_ORDER, MEALS_RESET_ORDER
} from './Meals.actions';

export const mealsInitialState: IState = fromJS({
  entities: [],
  loading: false,
  error: null,
  searchFilter: '',
  groupFilter: '',
  order: {}
});

export const mealsReducer: IReducer = createReducer(mealsInitialState, {

  [MEALS_FETCH_START](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entities: [],
      loading: true,
      error: null
    }));
  },

  [MEALS_FETCH_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entities: action.payload,
      loading: false,
      error: null
    }));
  },

  [MEALS_FETCH_ERROR](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entities: [],
      loading: false,
      error: action.payload
    }));
  },

  [MEALS_SET_SEARCH_FILTER](state: IState, action: IAction): IState {
    return state.set('searchFilter', String(action.payload).toLowerCase());
  },

  [MEALS_SET_GROUP_FILTER](state: IState, action: IAction): IState {
    return state.set('groupFilter', action.payload);
  },

  [MEALS_UPDATE_ORDER](state: IState, action: IAction): IState {
    let { mealId, units } = action.payload;
    units = Number(units);
    mealId = String(mealId);

    if (units) {
      return state
        .update('order', order => order.set(mealId, units));
    } else {
      return state
        .update('order', order => order.delete(mealId));
    }
  },

  [MEALS_RESET_ORDER](state: IState, action: IAction): IState {
    return state
      .set('order', mealsInitialState.get('order'));
  },

  [MEALS_RESET_SEARCH](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      searchFilter: '',
      groupFilter: ''
    }));
  }

});
