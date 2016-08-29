import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { FakeRestClient, createMockStore } from '../../utils/testing';
import { IAction } from '../../base/interfaces';
import { RestClient } from '../../base/restClient';
import { UsersActions } from './Users.actions';


describe('UsersActions', () => {
  let store: any;
  let restClient: FakeRestClient;

  beforeEach(() => {
    store = createMockStore({});
    restClient = new FakeRestClient();

    TestBed.configureTestingModule({
      providers: [
        UsersActions,
        { provide: RestClient, useValue: restClient }
      ]
    });
  });

  describe('fetchOne', () => {
    let subject: IAction;

    beforeEach(inject([ UsersActions ], (usersActions: UsersActions) => {
      subject = usersActions.fetchOne(42);
    }));

    it('returns the correct action object', () => {
      expect(subject.type).toEqual('USER_FETCH');
      expect(subject.payload).toEqual(jasmine.any(Observable));
    });

    it('dispatches the correct async actions', () => {
      store.dispatch(subject);
      const actions = store.getActions();

      expect(actions).toEqual([
        { type: 'USER_FETCH_START' },
        { type: 'USER_FETCH_NEXT', payload: 'fake payload' },
        { type: 'USER_FETCH_COMPLETED' },
      ]);

    });

    it('calls the API with correct params', () => {
      expect(restClient.path).toEqual('users/42');
    });

  });

});