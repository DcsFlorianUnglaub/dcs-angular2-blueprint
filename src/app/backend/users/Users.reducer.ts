import { USERS_FETCH_START, USERS_FETCH_NEXT, USERS_FETCH_ERROR } from './Users.actions';
import { fromJS } from 'immutable';

import { IState, IAction } from '../../base/interfaces';


const initialState: IState = fromJS({
  entities: [],
  loading: false,
  error: null
});

export const usersReducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case USERS_FETCH_START:
       return state.withMutations(map => {
        map
          .set('loading', true)
          .set('entities', fromJS([]))
          .set('error', null);
      });

    case USERS_FETCH_NEXT:
      return state.withMutations(map => {
        map
          .set('loading', false)
          .set('entities', fromJS(action.payload))
          .set('error', null);
      });

    case USERS_FETCH_ERROR:
      return state.withMutations(map => {
        map
          .set('loading', false)
          .set('entities', fromJS([]))
          .set('error', action.payload);
      });
  }

  return state;
};
