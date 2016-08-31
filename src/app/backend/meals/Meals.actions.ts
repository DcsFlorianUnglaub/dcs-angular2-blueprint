import { Injectable } from '@angular/core';

import { IAction } from '../../base/interfaces';
import { RestClient } from '../../base/restClient';


export const MEALS_FETCH: string = 'MEALS_FETCH';
export const MEALS_FETCH_START: string = 'MEALS_FETCH_START';
export const MEALS_FETCH_NEXT: string = 'MEALS_FETCH_NEXT';
export const MEALS_FETCH_ERROR: string = 'MEALS_FETCH_ERROR';
export const MEALS_SET_SEARCH_FILTER: string = 'MEALS_SET_SEARCH_FILTER';
export const MEALS_SET_GROUP_FILTER: string = 'MEALS_SET_GROUP_FILTER';
export const MEALS_UPDATE_ORDER: string = 'MEALS_UPDATE_ORDER';
export const MEALS_RESET_ORDER: string = 'MEALS_RESET_ORDER';
export const MEALS_RESET_SEARCH: string = 'MEALS_RESET_SEARCH';

@Injectable()
export class MealsActions {

  constructor(private restClient: RestClient) { }

  fetch(): IAction {
    return {
      type: MEALS_FETCH,
      payload: this.restClient.get('meals')
    };
  }

  setSearchFilter(search: string): IAction {
    return {
      type: MEALS_SET_SEARCH_FILTER,
      payload: search
    };
  }

  setGroupFilter(group: string): IAction {
    return {
      type: MEALS_SET_GROUP_FILTER,
      payload: group
    };
  }

  updateOrder(mealId: number, units: string): IAction {
    return {
      type: MEALS_UPDATE_ORDER,
      payload: { mealId, units }
    };
  }

  resetOrder(): IAction {
    return {
      type: MEALS_RESET_ORDER
    };
  }

  resetSearch(): IAction {
    return {
      type: MEALS_RESET_SEARCH
    };
  }

}
