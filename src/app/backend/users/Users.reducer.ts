import { USERS_FETCH_START, USERS_FETCH_NEXT, USERS_FETCH_ERROR, USER_SAVE_NEXT, USER_DELETE_NEXT } from './Users.actions';
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

    case USER_SAVE_NEXT:
      return state.update('entities', entities => {
        return entities.map(entity => {
          if (entity.get('id') === action.payload.id) {
            return fromJS(action.payload);
          }
          return entity;
        });
      });

    case USER_DELETE_NEXT:
      return state.update('entities', entities => {
        return entities.filterNot(entity => entity.equals(action.payload));
      });
  }

  return state;
};
