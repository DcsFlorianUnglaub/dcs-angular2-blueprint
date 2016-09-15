import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { UsersActions } from '../backend/Users.actions';

import { List } from 'immutable';

@Component({
  selector: 'dcs-users-page',
  templateUrl: './UsersPage.tpl.html'
})
export class UsersPageComponent extends ContainerComponent {

  @select(['users']) state$: Observable<any>;
  @select(['users', 'entities']) users$: Observable<any>;
  @select(['currentUser', 'entity']) currentUser$: Observable<any>;
  @select(['users', 'loading']) loading$: Observable<any>;
  @select(['users', 'error']) error$: Observable<any>;

  users: List<any>;

  constructor(private store: NgRedux<any>, private usersActions: UsersActions) {
    super();

    this.state$
      .first()
      .subscribe(state => {
        if ( (state.get('entities').size === 0) && (!state.get('loading'))) {
          this.store.dispatch(this.usersActions.fetch());
        }
      });

    this.users$.subscribe(users => {
      this.users = users;
    });

    // TODO: HACK
    this.currentUser$.subscribe(cu => {
      if (cu && !this.users.map(u => u.get('id')).includes(cu.get('id'))) {
        this.users = this.users.push(cu);
      }
    });
  }

  deleteUser(user: any) {
    this.store.dispatch(this.usersActions.delete(user));
  }

}
