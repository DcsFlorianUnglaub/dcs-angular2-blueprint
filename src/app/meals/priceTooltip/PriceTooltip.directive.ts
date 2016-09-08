import { Directive, Input, OnChanges, HostBinding } from '@angular/core';
import { Map } from 'immutable';
import * as numeral from 'numeral';

@Directive({
  selector: '[dcsPriceTooltip]'
})
export class PriceTooltipDirective implements OnChanges {

  @Input() dcsPriceTooltip: Map<string, any>;
  @Input() units: number;

  @HostBinding('class') hostClass: string = 'dcs-tooltip dcs-tooltip-top';
  @HostBinding('attr.data-tooltip') message: string = '';


  ngOnChanges() {
    this.message = this.createMessage(this.dcsPriceTooltip.get('price'), this.units);
  }

  createMessage(price: number, units: number = 0): string {
    let priceFormatted: string;

    if (units) {
      let itemsText: string = units === 1 ? 'item' : 'items';
      priceFormatted = numeral(price * units).format('0,0.00 $');
      return `The total price for the ${units} ${itemsText} is ${priceFormatted}`;
    } else {
      priceFormatted = numeral(price).format('0,0.00 $');
      return `The price for one item is ${priceFormatted}`;
    }
  }

}
