import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { List, Map } from 'immutable';

import { IState } from '../../shared/interfaces';
import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { MealsActions } from '../backend/Meals.actions';
import { totalPrice, orderSize } from '../backend/Meals.selectors';


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
  @select(orderSize) orderSize$: Observable<number>;
  @select(totalPrice) totalPrice$: Observable<number>;

  cancelSearch: Subject<any> = new Subject();

  constructor(private store: NgRedux<IState>, private actions: MealsActions) {
    super();

    if (this.store.getState().getIn(['meals', 'entities']).size === 0) {
      this.store.dispatch(this.actions.fetch());
    }
  }

  ngOnInit(): void {
    // this is why we need to unsubscribe when the Component is destroyed
    // navigate multiple times between "Users" and "Order Meals" and then do search
    // we call this "event leak" based on the term "memory leak"
    // this.searchFilter$.subscribe((search: string) => {
    //   console.log('search change: ', search, performance.now(), this.searchFilter$);
    // });
  }

  setSearchFilter(search: string) {
    this.cancelSearch.next();
    this.store.dispatch(this.actions.search(search, this.cancelSearch));
  }

  setGroupFilter(group: string) {
    this.store.dispatch(this.actions.setGroupFilter(group));
  }

  orderUpdated({ meal, units }: { meal: Map<string, any>, units: string }) {
    this.store.dispatch(this.actions.updateOrder(meal, units));
  }

  sendOrder() {
    console.log('sending order ...');
  }

  resetOrder() {
    this.store.dispatch(this.actions.resetOrder());
  }

  resetSearch() {
    this.cancelSearch.next();
    this.store.dispatch(this.actions.search('', this.cancelSearch));
  }

}
