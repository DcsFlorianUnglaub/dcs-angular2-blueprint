import { Map } from 'immutable';

export interface IState extends Map<string, any> { }

export interface IAction {
  type: string;
  payload?: any;
  meta?: any;
}

export interface IReducer {
  (state?: IState, action?: IAction): IState;
}
