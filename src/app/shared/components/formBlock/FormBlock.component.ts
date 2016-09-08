import { Component, Input } from '@angular/core';


@Component({
  selector: 'dcs-form-block',
  template: require('./FormBlock.tpl.html')
})
export class FormBlockComponent {

  @Input() hasError: boolean;

}
