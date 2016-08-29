import { USERS_FETCH_START, USERS_FETCH_NEXT, USERS_FETCH_ERROR, USER_SAVE_NEXT, USER_DELETE_NEXT } from './Users.actions';
import { fromJS } from 'immutable';

import { IState, IAction } from '../../base/interfaces';


const usersInitialState: IState = fromJS({
  entities: [],
  loading: false,
  error: null
});

export const usersReducer = (state: IState = usersInitialState, action: IAction): IState => {
  switch (action.type) {
    case USERS_FETCH_START:
      return state.merge(fromJS({
        loading: true,
        entities: [],
        error: null
      }));

    case USERS_FETCH_NEXT:
      return state.merge(fromJS({
        loading: false,
        entities: action.payload,
        error: null
      }));

    case USERS_FETCH_ERROR:
      return state.merge(fromJS({
        loading: false,
        entities: [],
        error: action.payload
      }));

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
