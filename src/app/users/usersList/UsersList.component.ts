import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { List } from 'immutable';

import { PresentationalComponent } from '../../base/component/PresentationalComponent';


@Component({
  selector: 'dcs-users-list',
  templateUrl: './UsersList.tpl.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent extends PresentationalComponent {

  @Input() users: List<any>;
  @Input() loading: boolean;
  @Output() deleteUser = new EventEmitter();

  get usersAvailable(): boolean {
    return this.users &&  this.users.size > 0;
  }
}
