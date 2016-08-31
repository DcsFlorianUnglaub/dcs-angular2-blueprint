import { Directive, ElementRef, Input, Renderer, OnChanges, OnInit } from '@angular/core';
import { Map } from 'immutable';

@Directive({
  selector: '[dcsPriceTooltip]'
})
export class PriceTooltipDirective implements OnChanges, OnInit {

  @Input('dcsPriceTooltip') dcsPriceTooltip: Map<string, any>;
  @Input() units: number;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementClass(this.el.nativeElement, 'dcs-tooltip' , true);
    this.renderer.setElementClass(this.el.nativeElement, 'dcs-tooltip-top' , true);
  }

  ngOnChanges() {
    let message: string;
    let price: string;

    if (this.units) {
      let itemsText: string = this.units === 1 ? 'item': 'items';
      price = (this.dcsPriceTooltip.get('price') * this.units).toFixed(2);
      message = `The  total price for the ${this.units} ${itemsText} is ${price} €`;
    } else {
      price = this.dcsPriceTooltip.get('price').toFixed(2);
      message = `The price for one meal is ${price} €`;
    }

    this.renderer.setElementAttribute(this.el.nativeElement, 'data-tooltip', message);
  }

}
