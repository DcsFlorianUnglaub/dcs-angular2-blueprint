import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { List, Map } from 'immutable';

import { IState } from '../../base/interfaces';
import { ContainerComponent } from '../../base/component/ContainerComponent';
import { MealsActions } from '../../backend/meals/Meals.actions';
import { totalPrice } from '../../backend/meals/Meals.selectors';


@Component({
  selector: 'dcs-meals-page',
  templateUrl: './MealsPage.tpl.html'
})
export class MealsPageComponent extends ContainerComponent implements OnInit {

  @select(['meals', 'entities']) meals$: Observable<List<Map<string, any>>>;
  @select(['meals', 'loading']) loading$: Observable<boolean>;
  @select(['meals', 'error']) error$: Observable<Error>;
  @select(['meals', 'searchFilter']) searchFilter$: Observable<string>;
  @select(['meals', 'groupFilter']) groupFilter$: Observable<string>;
  @select(['meals', 'order']) order$: Observable<Map<string, number>>;
  @select(totalPrice) totalPrice$: Observable<number>;

  constructor(private store: NgRedux<IState>, private actions: MealsActions) {
    super();
  }

  ngOnInit(): void {
    if (this.store.getState().getIn(['meals', 'entities']).size === 0) {
      this.store.dispatch(this.actions.fetch());
    }
  }

  setSearchFilter(search: string) {
    this.store.dispatch(this.actions.setSearchFilter(search));
  }

  setGroupFilter(group: string) {
    this.store.dispatch(this.actions.setGroupFilter(group));
  }

  orderUpdated({ mealId, units }: { mealId: number, units: string }) {
    this.store.dispatch(this.actions.updateOrder(mealId, units));
  }

  sendOrder() {
    console.log('sending order ...');
  }

  resetOrder() {
    this.store.dispatch(this.actions.resetOrder());
  }

  resetSearch() {
    this.store.dispatch(this.actions.resetSearch());
  }

}
