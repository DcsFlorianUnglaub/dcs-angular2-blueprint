import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Map } from 'immutable';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { UsersActions } from '../backend/Users.actions';


@Component({
  selector: 'dcs-current-user-page',
  templateUrl: './CurrentUserPage.tpl.html'
})
export class CurrentUserPageComponent extends ContainerComponent implements OnInit {

  @select(['currentUser', 'entity']) currentUser$: Observable<any>;
  @select(['currentUser', 'formData']) formData$: Observable<any>;
  @select(['currentUser', 'loading']) loading$: Observable<boolean>;
  @select(['currentUser', 'error']) error$: Observable<any>;
  @select(['currentUser', 'saving']) saving$: Observable<boolean>;

  currentUser: Map<string, any> = Map<string, any>();

  constructor(
    private route: ActivatedRoute,
    private store: NgRedux<any>,
    private router: Router,
    private usersActions: UsersActions
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.currentUser$.subscribe(user => {
      this.currentUser = user;
    }));

    this.subscriptions.push(this.route.params.subscribe(params => {
      let id: number = Number(params['id']);
      this.store.dispatch(this.usersActions.fetchOne(id));
    }));
  }

  updateFormData({ formData, dirty }: { formData: any, dirty: boolean }): void {
    this.store.dispatch(this.usersActions.updateFormData(formData, dirty));
  }

  saveUser(user: any): void {
    user = this.currentUser.merge(user);
    this.store.dispatch(this.usersActions.save(user));

    let subscription: Subscription = this.saving$
      .subscribe((saving: boolean) => {
        if (!saving) {
          subscription.unsubscribe();
          this.router.navigate(['/users']);
        }
      });

    this.subscriptions.push(subscription);
  }

}
