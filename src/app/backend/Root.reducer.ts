import { OpaqueToken } from '@angular/core';
import { combineReducers } from 'redux-immutable';

import { IReducer } from '../base/interfaces';
import { usersReducer } from './users/Users.reducer';
import { currentUserReducer } from './users/CurrentUser.reducer';
import { mealsReducer } from './meals/Meals.reducer';


export const RootReducer: OpaqueToken = new OpaqueToken('RootReducer');

const appReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  meals: mealsReducer
});

export const rootReducer: IReducer = function(state, action) {
  if (action.type === 'HMR_RESET_STATE') {
    state = action.payload;
  }

  return appReducer(state, action);
};
