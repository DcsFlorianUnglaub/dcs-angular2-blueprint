import { IAction } from '../../base/interfaces';
import { RestClient } from '../../base/restClient';
import {
  addProviders,
  inject
} from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { FakeRestClient, createMockStore } from '../../base/testUtils';
import { UsersActions } from './Users.actions';


describe('UsersActions', () => {
  let store: any;

  beforeEach(() => addProviders([
    {
      provide: RestClient,
      useFactory: () => {
        return new FakeRestClient();
      },
    },
    UsersActions
  ]));

  beforeEach(() => {
    store = createMockStore({});
  });

  describe('fetchOne', () => {
    let subject: IAction;

    beforeEach(inject([ UsersActions ], (usersActions) => {
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

  });

});
