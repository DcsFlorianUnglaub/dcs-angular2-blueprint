import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { PresentationalComponent } from '../../base/component/PresentationalComponent';

@Component({
  selector: 'dcs-users-grid',
  templateUrl: './UsersGrid.tpl.html',
  directives: [ROUTER_DIRECTIVES]
})
export class UsersGridComponent extends PresentationalComponent {
  @Input() users: any;
  @Input() loading: boolean;
  @Output() deleteUser = new EventEmitter();
}
