import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { List, Map } from 'immutable';

import { PresentationalComponent } from '../../base/component/PresentationalComponent';


@Component({
  selector: 'dcs-meals-grid',
  template: require('./MealsGrid.tpl.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    require('./MealsGrid.scss').toString()
  ]
})
export class MealsGridComponent extends PresentationalComponent {

  @Input() meals: List<Map<string, any>>;
  @Input() loading: boolean;
  @Input() error: Error;
  @Input() searchFilter: string;
  @Input() groupFilter: string;
  @Input() totalPrice: number;
  @Input() order: Map<any, number>;

  @Output() setSearchFilter = <EventEmitter<string>> new EventEmitter().debounceTime(300);
  @Output() setGroupFilter = <EventEmitter<string>> new EventEmitter();
  @Output() orderUpdated = <EventEmitter<any>> new EventEmitter();
  @Output() resetSearch = <EventEmitter<any>> new EventEmitter();

  get filteredMeals(): List<Map<string, any>> {
    if (this.loading) {
      return List([]);
    }

    let orders = List(this.order.keys());

    if (!this.meals) {
      return orders;
    }

    let filtered: List<any> = this.meals
      .filter(meal => (!this.groupFilter) || meal.get('group') === this.groupFilter)
      .toList();

    return orders
      .filterNot(order => filtered.includes(order))
      .concat(filtered)
      .toList();
  }

  get productGroups(): List<string> {
    if (!this.meals) {
      return List([]);
    }

    return this.meals
      .map(meal => meal.get('group'))
      .toSet()
      .sortBy(group => group)
      .toList();
  }

  get searchMatch(): RegExp {
    return new RegExp(this.searchFilter, 'ig');
  }

  highlightSearchMatch(text: string): string {
    if (!this.searchFilter) {
      return text;
    }
    return text.replace(this.searchMatch, '<strong class="match">$&</strong>');
  }

  updateOrder(meal: Map<string, any>, units: number) {
    this.orderUpdated.next({ meal, units });
  }

  hasOrder(meal: Map<string, any>): boolean {
    return !!this.getUnits(meal);
  }

  getUnits(meal: Map<string, any>): number {
    return this.order.get(meal) || 0;
  }

}
