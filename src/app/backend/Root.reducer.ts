import { combineReducers } from 'redux';

import { usersReducer } from './users/Users.reducer';
import { userReducer } from './users/User.reducer';


export const rootReducer = combineReducers({
  users: usersReducer,
  currentUser: userReducer
});
