import { UsersGridComponent } from '../usersGrid/UsersGrid.component';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgRedux, select } from 'ng2-redux';
import { Map } from 'immutable';

import { ContainerComponent } from '../../base/component/ContainerComponent';
import { UsersActions } from '../../backend/users/Users.actions';

@Component({
  selector: 'dcs-users-page',
  templateUrl: './UsersPage.tpl.html',
  providers: [UsersActions],
  directives: [UsersGridComponent]
})
export class UsersPageComponent extends ContainerComponent implements OnInit {

  @select(['users']) state$: any;
  @select(['users', 'entities']) users$: any;
  @select(['users', 'loading']) loading$: any;
  @select(['users', 'error']) error$: any;

  constructor(private store: NgRedux<any>, private usersActions: UsersActions) {
    super();
  }

  ngOnInit(): void {
    this.state$
      .first()
      .subscribe(state => {
        if ( (state.get('entities').size === 0) && (!state.get('loading'))) {
          this.store.dispatch(this.usersActions.fetch());
        }
      });
  }

  identify(index: number, item: Map<string, any>): number {
    return item.hashCode();
  }

  deleteUser(user: any) {
    this.store.dispatch(this.usersActions.delete(user));
  }

}
