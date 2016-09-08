import { OpaqueToken } from '@angular/core';
import { combineReducers } from 'redux-immutable';

import { IReducer } from '../base/interfaces';
import { usersReducer } from './users/Users.reducer';
import { currentUserReducer } from './users/CurrentUser.reducer';
import { mealsReducer } from './meals/Meals.reducer';


export const RootReducer: OpaqueToken = new OpaqueToken('RootReducer');

export const rootReducer: IReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  meals: mealsReducer
});
