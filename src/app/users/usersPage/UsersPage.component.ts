import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { UsersActions } from '../backend/Users.actions';


@Component({
  selector: 'dcs-users-page',
  templateUrl: './UsersPage.tpl.html'
})
export class UsersPageComponent extends ContainerComponent {

  @select(['users']) state$: Observable<any>;
  @select(['users', 'entities']) users$: Observable<any>;
  @select(['users', 'loading']) loading$: Observable<any>;
  @select(['users', 'error']) error$: Observable<any>;

  constructor(private store: NgRedux<any>, private usersActions: UsersActions) {
    super();

    this.state$
      .first()
      .subscribe(state => {
        if ( (state.get('entities').size === 0) && (!state.get('loading'))) {
          this.store.dispatch(this.usersActions.fetch());
        }
      });
  }

  deleteUser(user: any) {
    this.store.dispatch(this.usersActions.delete(user));
  }

}
