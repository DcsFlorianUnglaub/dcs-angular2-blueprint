import { OpaqueToken } from '@angular/core';
import { combineReducers } from 'redux-immutable';

import { IReducer } from '../shared/interfaces';
import { usersReducer } from '../users/backend/Users.reducer';
import { currentUserReducer } from '../users/backend/CurrentUser.reducer';
import { mealsReducer } from '../meals/backend/Meals.reducer';


export const RootReducer: OpaqueToken = new OpaqueToken('RootReducer');

export const rootReducer: IReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  meals: mealsReducer
});
