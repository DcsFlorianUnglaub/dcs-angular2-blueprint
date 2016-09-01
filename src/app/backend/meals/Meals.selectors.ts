import { Map } from 'immutable';

import { IState } from '../../base/interfaces';


export function totalPrice(state: IState): number {
  let prices: Map<string, number> = state
    .getIn(['meals', 'entities'])
    .reduce((collector, meal) => collector.set(meal.get('id'), meal.get('price')), Map());

  return state.getIn(['meals', 'order'])
    .reduce((sum, units, mealId) => sum + (prices.get(mealId) * units), 0);
}
