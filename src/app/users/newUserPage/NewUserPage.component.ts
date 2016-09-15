import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NgRedux, select } from 'ng2-redux';
import { Map } from 'immutable';

import { ContainerComponent } from '../../shared/component/ContainerComponent';
import { UsersActions } from '../backend/Users.actions';


@Component({
  selector: 'dcs-new-user-page',
  templateUrl: './NewUserPage.tpl.html'
})
export class NewUserPageComponent extends ContainerComponent {

  @select(['currentUser', 'saving']) saving$: Observable<boolean>;
  @select(['currentUser', 'formData']) formData$: Observable<any>;


  currentUser: Map<string, any> = Map<string, any>();

  constructor(
    private store: NgRedux<any>,
    private usersActions: UsersActions,
    private router: Router
  ) {
    super();
  }

  saveUser(user: any): void {
    this.store.dispatch(this.usersActions.save(user));

    let subscription: Subscription = this.saving$
      .subscribe((saving: boolean) => {
        if (!saving) {
          // Ist das nicht redundant mit dem Code in ContainerComponent?
          subscription.unsubscribe();
          this.router.navigate(['/users']);
        }
      });

    this.subscriptions.push(subscription);
  }

  updateFormData({ formData, dirty }: { formData: any, dirty: boolean }): void {
    this.store.dispatch(this.usersActions.updateFormData(formData, dirty));
  }

}
