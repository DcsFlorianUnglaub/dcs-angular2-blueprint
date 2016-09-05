import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { IAction } from '../../base/interfaces';
import { RestClient } from '../../base/restClient';


export const MEALS_FETCH: string = 'MEALS_FETCH';
export const MEALS_FETCH_START: string = 'MEALS_FETCH_START';
export const MEALS_FETCH_NEXT: string = 'MEALS_FETCH_NEXT';
export const MEALS_FETCH_ERROR: string = 'MEALS_FETCH_ERROR';

export const MEALS_SEARCH: string = 'MEALS_SEARCH';
export const MEALS_SEARCH_START: string = 'MEALS_SEARCH_START';
export const MEALS_SEARCH_NEXT: string = 'MEALS_SEARCH_NEXT';
export const MEALS_SEARCH_ERROR: string = 'MEALS_SEARCH_ERROR';

export const MEALS_SET_GROUP_FILTER: string = 'MEALS_SET_GROUP_FILTER';
export const MEALS_UPDATE_ORDER: string = 'MEALS_UPDATE_ORDER';
export const MEALS_RESET_ORDER: string = 'MEALS_RESET_ORDER';


@Injectable()
export class MealsActions {

  constructor(private restClient: RestClient) { }

  fetch(): IAction {
    return {
      type: MEALS_FETCH,
      payload: this.restClient.get('meals')
    };
  }

  search(searchTerm: string, cancel?: Observable<any>) {
    return {
      type: MEALS_SEARCH,
      // simulate a slow search API
      payload: this.restClient.get(`meals?q=${searchTerm}`)
      // .delay(5000),
      ,
      meta: {
        cancel: cancel,
        searchTerm: searchTerm
      }
    };
  }

  setGroupFilter(group: string): IAction {
    return {
      type: MEALS_SET_GROUP_FILTER,
      payload: group
    };
  }

  updateOrder(meal: Map<string, any>, units: string): IAction {
    return {
      type: MEALS_UPDATE_ORDER,
      payload: { meal, units }
    };
  }

  resetOrder(): IAction {
    return {
      type: MEALS_RESET_ORDER
    };
  }

}
