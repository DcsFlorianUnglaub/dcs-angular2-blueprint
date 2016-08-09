import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { fromJS, Map } from 'immutable';

import { ContainerComponent } from '../../base/component/ContainerComponent';
import { UsersActions } from '../../backend/users/Users.actions';


@Component({
  selector: 'dcs-user-page',
  templateUrl: './UserPage.tpl.html',
  providers: [UsersActions],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class UserPageComponent extends ContainerComponent implements OnInit {

  @select(['currentUser', 'entity']) currentUser$: Observable<any>;
  @select(['currentUser', 'loading']) loading$: Observable<any>;
  @select(['currentUser', 'error']) error$: Observable<any>;

  currentUser: Map<string, any> = Map<string, any>();

  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: NgRedux<any>,
    private usersActions: UsersActions
  ) {
    super();

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('.+@.+')]]
    });
  }

  ngOnInit(): void {

    this.currentUser$.subscribe(data => {
      if (data) {
        this.currentUser = data;

        ['name', 'username', 'email'].forEach(fieldName => {
          this.userForm.controls[fieldName]['updateValue'](this.currentUser.get(fieldName));
        });
      }
    });

    this.route.params.subscribe(params => {
      let id: number = Number(params['id']);

      if (this.currentUser.get('id') !== id) {
        this.store.dispatch(this.usersActions.fetchOne(id));
      }
    });

  }

  saveUser(): void {
    let user: any = this.currentUser.merge(fromJS(this.userForm.value));
    if (this.userForm.valid && (!user.equals(this.currentUser))) {
      this.store.dispatch(this.usersActions.save(user));
    }
  }

  hasError(fieldName: string): boolean {
    return !!this.userForm.controls[fieldName].errors;
  }

}
