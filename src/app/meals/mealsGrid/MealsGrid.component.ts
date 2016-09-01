import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { List, Map } from 'immutable';

import { PresentationalComponent } from '../../base/component/PresentationalComponent';


@Component({
  selector: 'dcs-meals-grid',
  template: require('./MealsGrid.tpl.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealsGridComponent extends PresentationalComponent {

  @Input() meals: List<Map<string, any>>;
  @Input() loading: boolean;
  @Input() error: Error;
  @Input() searchFilter: string;
  @Input() groupFilter: string;
  @Input() totalPrice: number;
  @Input() order: Map<string, number>;

  @Output() setSearchFilter = <EventEmitter<string>> new EventEmitter().debounceTime(300);
  @Output() setGroupFilter = <EventEmitter<string>> new EventEmitter();
  @Output() orderUpdated = <EventEmitter<any>> new EventEmitter();
  @Output() resetSearch = <EventEmitter<any>> new EventEmitter();

  get filteredMeals(): List<Map<string, any>> {
    const searchMatch: RegExp = this.searchMatch;

    return this.meals
      .filter(meal => (!this.searchFilter) || this.hasOrder(meal) || meal.get('title').match(searchMatch) || meal.get('description').match(searchMatch))
      .filter(meal => (!this.groupFilter)  || this.hasOrder(meal) || meal.get('group') === this.groupFilter)
      .toList();
  }

  get productGroups(): List<string> {
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

  updateOrder(mealId: number, units: number) {
    this.orderUpdated.next({ mealId, units });
  }

  hasOrder(meal: Map<string, any>): boolean {
    return !!this.getUnits(meal);
  }

  getUnits(meal: Map<string, any>): number {
    return this.order.get(String(meal.get('id'))) || 0;
  }

}
