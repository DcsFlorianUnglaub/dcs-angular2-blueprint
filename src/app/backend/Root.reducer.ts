import { combineReducers } from 'redux-immutable';

import { usersReducer } from './users/Users.reducer';
import { currentUserReducer } from './users/CurrentUser.reducer';
import { mealsReducer } from './meals/Meals.reducer';

const appReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  meals: mealsReducer
});

export const rootReducer = function(state, action) {
  if (action.type === 'HMR_RESET_STATE') {
    state = action.payload;
  }

  return appReducer(state, action);
};
