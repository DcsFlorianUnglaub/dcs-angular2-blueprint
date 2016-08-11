import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { ContainerComponent } from '../../base/component/ContainerComponent';
import { UsersActions } from '../../backend/users/Users.actions';


@Component({
  selector: 'dcs-current-user-page',
  templateUrl: './CurrentUserPage.tpl.html'
})
export class CurrentUserPageComponent extends ContainerComponent implements OnInit {

  @select(['currentUser', 'entity']) currentUser$: Observable<any>;
  @select(['currentUser', 'loading']) loading$: Observable<boolean>;
  @select(['currentUser', 'error']) error$: Observable<any>;

  currentUser: Map<string, any> = Map<string, any>();

  constructor(
    private route: ActivatedRoute,
    private store: NgRedux<any>,
    private usersActions: UsersActions
  ) {
    super();
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let id: number = Number(params['id']);

      if (this.currentUser.get('id') !== id) {
        this.store.dispatch(this.usersActions.fetchOne(id));
      }
    });

  }

  saveUser(user: any): void {
    this.store.dispatch(this.usersActions.save(user));
  }

}
