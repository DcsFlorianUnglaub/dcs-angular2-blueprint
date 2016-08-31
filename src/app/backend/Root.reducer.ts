import { combineReducers } from 'redux-immutable';

import { usersReducer } from './users/Users.reducer';
import { currentUserReducer } from './users/CurrentUser.reducer';
import { mealsReducer } from './meals/Meals.reducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  meals: mealsReducer
});
