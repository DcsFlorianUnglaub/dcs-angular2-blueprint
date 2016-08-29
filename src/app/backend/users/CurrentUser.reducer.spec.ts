import { Map } from 'immutable';
import { IState } from '../../base/interfaces';
import { currentUserReducer, currentUserInitialState } from './CurrentUser.reducer';

describe('CurrentUser.reducer', () => {

  let subject: IState;

  describe('initial state', () => {

    it('returns the defined initial state given no action', () => {
      subject = currentUserReducer(undefined, { type: 'no real action' });

      expect(Map.isMap(subject)).toBeTruthy();
      expect(currentUserInitialState.equals(subject)).toBeTruthy();
    });

  });

  describe('USER_FETCH_START', () => {

    it('sets loading to true', () => {
      subject = currentUserReducer(currentUserInitialState, { type: 'USER_FETCH_START' });
      expect(subject.get('loading')).toEqual(true);
    });

  });

  describe('USER_FETCH_NEXT', () => {

    beforeEach(() => {
      let loadingState: IState = currentUserReducer(currentUserInitialState, { type: 'USER_FETCH_START' });
      subject = currentUserReducer(loadingState, { type: 'USER_FETCH_NEXT', payload: { name: 'Testuser' } });
    });

    it('sets loading to false', () => {
      expect(subject.get('loading')).toEqual(false);
    });

    it('sets the given payload in entity', () => {
      expect(subject.get('entity')).toEqual(Map({ name: 'Testuser' }));
    });

  });

});
