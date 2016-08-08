import { combineReducers } from 'redux';

import { usersReducer } from './users/Users.reducer';


export const rootReducer = combineReducers({
  users: usersReducer
});
