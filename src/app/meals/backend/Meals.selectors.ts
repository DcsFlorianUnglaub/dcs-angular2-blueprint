import { IState } from '../../shared/interfaces';


export function totalPrice(state: IState): number {
  return state.getIn(['meals', 'order'])
    .reduce((sum, units, meal) => sum + (meal.get('price') * units), 0);
}

export function orderSize(state: IState): number {
  return state.getIn(['meals', 'order']) ? state.getIn(['meals', 'order']).size : 0;
}
