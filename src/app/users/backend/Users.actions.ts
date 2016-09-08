import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { IAction } from '../../shared/interfaces';
import { RestClient } from '../../shared/services/RestClient';


export const USERS_FETCH: string = 'USERS_FETCH';
export const USERS_FETCH_START: string = 'USERS_FETCH_START';
export const USERS_FETCH_NEXT: string = 'USERS_FETCH_NEXT';
export const USERS_FETCH_ERROR: string = 'USERS_FETCH_ERROR';

export const USER_FETCH: string = 'USER_FETCH';
export const USER_FETCH_START: string = 'USER_FETCH_START';
export const USER_FETCH_NEXT: string = 'USER_FETCH_NEXT';
export const USER_FETCH_ERROR: string = 'USER_FETCH_ERROR';

export const USER_SAVE: string = 'USER_SAVE';
export const USER_SAVE_START: string = 'USER_SAVE_START';
export const USER_SAVE_NEXT: string = 'USER_SAVE_NEXT';
export const USER_SAVE_ERROR: string = 'USER_SAVE_ERROR';

export const USER_DELETE: string = 'USER_DELETE';
export const USER_DELETE_NEXT: string = 'USER_DELETE_NEXT';
export const USER_DELETE_ERROR: string = 'USER_DELETE_ERROR';


@Injectable()
export class UsersActions {

  constructor(private restClient: RestClient) { }

  fetch(): IAction {
    return {
      type: USERS_FETCH,
      payload: this.restClient.get('users'),
      meta: {
        dispatchCompleted: true
      }
    };
  }

  fetchOne(id: number): IAction {
    return {
      type: USER_FETCH,
      payload: this.restClient.get(`users/${id}`)
    };
  }

  save(user: Map<string, any>): IAction {
    let payload: Observable<{}>;

    if (user.get('id')) {
      payload = this.restClient.put(`users/${user.get('id')}`, user.toJS());
    } else {
      payload = this.restClient.post(`users`, user.toJS());
    }

    return {
      type: USER_SAVE,
      payload: payload
    };
  }

  delete(user: Map<string, any>): IAction {
    return {
      type: USER_DELETE,
      payload: this.restClient
        .delete(`users/${user.get('id')}`)
        .map(() => user)
    };
  }

}
