import { fromJS } from 'immutable';

import { IState, IReducer, IAction } from '../../shared/interfaces';
import { createReducer } from '../../utils/reducer';
import {
  NOTES_FETCH_START, NOTES_FETCH_NEXT, NOTES_FETCH_ERROR,
  NOTE_FETCH_START, NOTE_FETCH_NEXT, NOTE_FETCH_ERROR,
  NOTES_CREATE_START, NOTES_CREATE_NEXT, NOTES_CREATE_ERROR,
  NOTES_DELETE_START, NOTES_DELETE_NEXT, NOTES_DELETE_ERROR,
  NOTE_UPDATE_START, NOTE_UPDATE_NEXT, NOTE_UPDATE_ERROR
} from './Notes.actions';

export const notesInitialState: IState = fromJS({
  entities: [],
  currentEntity: {},
  loading: false,
  error: null
});

function stateIsLoading(state: IState, clearEntities?: boolean): IState {
  return state.merge(fromJS({
    entities: clearEntities ? [] : state.get('entities'),
    currentEntity: clearEntities ? {} : state.get('currentEntity'),
    loading: true,
    error: null
  }));
}

function stateHasError(state: IState, action: IAction, clearEntities?: boolean): IState {
  return state.merge(fromJS({
    entities: clearEntities ? [] : state.get('entities'),
    currentEntity: clearEntities ? {} : state.get('currentEntity'),
    loading: false,
    error: action.payload
  }));
}

export const notesReducer: IReducer = createReducer(notesInitialState, {
   [NOTE_FETCH_START](state: IState, action: IAction): IState {
    return stateIsLoading(state, true);
  },

  [NOTE_FETCH_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      currentEntity: action.payload,
      loading: false,
      error: null
    }));
  },

  [NOTE_FETCH_ERROR](state: IState, action: IAction): IState {
    return stateHasError(state, action, true);
  },

  [NOTES_FETCH_START](state: IState, action: IAction): IState {
    return stateIsLoading(state, true);
  },

  [NOTES_FETCH_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entities: action.payload,
      loading: false,
      error: null
    }));
  },

  [NOTES_FETCH_ERROR](state: IState, action: IAction): IState {
    return stateHasError(state, action, true);
  },

  [NOTES_CREATE_START](state: IState, action: IAction): IState {
    return stateIsLoading(state);

  },

  [NOTES_CREATE_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entities: state.get('entities').toList().push(fromJS(action.payload)),
      loading: false,
      error: null
    }));
  },

  [NOTES_CREATE_ERROR](state: IState, action: IAction): IState {
    return stateHasError(state, action);
  },

  [NOTES_DELETE_START](state: IState, action: IAction): IState {
    return stateIsLoading(state);
  },

  [NOTES_DELETE_NEXT](state: IState, action: IAction): IState {
    return state.merge(fromJS({
      entities: state.get('entities').filterNot(entity => entity.get('id') === action.payload),
      loading: false,
      error: null
    }));
  },

  [NOTES_DELETE_ERROR](state: IState, action: IAction): IState {
    return stateHasError(state, action);
  },

  [NOTE_UPDATE_START](state: IState, action: IAction): IState {
    return stateIsLoading(state);

  },

  [NOTE_UPDATE_NEXT](state: IState, action: IAction): IState {
    let id: number = action.payload.id;

    return state.merge(fromJS({
      entities: state.get('entities').map(entity => {
        if (entity.get('id') === id) {
          return action.payload;
        } else {
          return entity;
        }
      }),
      loading: false,
      error: null
    }));
  },

  [NOTE_UPDATE_ERROR](state: IState, action: IAction): IState {
    return stateHasError(state, action);
  }
});
