import { Injectable } from '@angular/core';

import { RestClient } from '../../base/restClient';


export const USERS_FETCH: string = 'USERS_FETCH';
export const USERS_FETCH_START: string = 'USERS_FETCH_START';
export const USERS_FETCH_NEXT: string = 'USERS_FETCH_NEXT';
export const USERS_FETCH_ERROR: string = 'USERS_FETCH_ERROR';

@Injectable()
export class UsersActions {

  constructor(private restClient: RestClient) {

  }

  fetch(): any {
    return {
      type: USERS_FETCH,
      payload: this.restClient.get('users')
    };
  }

}
