import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NgRedux, select } from 'ng2-redux';

import { UsersActions } from '../../users/backend/Users.actions';


@Injectable()
export class CancelEditGuard implements CanDeactivate<any> {

  @select(['currentUser', 'formDirty']) formDirty$;
  formDirty: boolean;

  constructor(private store: NgRedux<any>, private usersActions: UsersActions) {
    this.formDirty$.subscribe(data => {
      this.formDirty = data;
    });
  }

  canDeactivate() {
    let result: boolean;

    if (!this.formDirty) {
      result = true;
    }

    if (!result) {
      result = window.confirm('You have unsaved changes! Are you sure you want to leave this page?');
    }

    this.store.dispatch(this.usersActions.resetFormData());
    return result;
  }

}
