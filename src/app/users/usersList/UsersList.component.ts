import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PresentationalComponent } from '../../base/component/PresentationalComponent';


@Component({
  selector: 'dcs-users-list',
  templateUrl: './UsersList.tpl.html'
})
export class UsersListComponent extends PresentationalComponent {

  @Input() users: any;
  @Input() loading: boolean;
  @Output() deleteUser = new EventEmitter();

}
