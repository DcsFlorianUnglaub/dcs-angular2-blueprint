import { combineReducers } from 'redux';

import { usersReducer } from './users/Users.reducer';
import { currentUserReducer } from './users/CurrentUser.reducer';


export const rootReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer
});
