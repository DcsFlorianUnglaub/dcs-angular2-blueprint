import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromJS } from 'immutable';

import { PresentationalComponent } from '../../base/component/PresentationalComponent';


@Component({
  selector: 'dcs-user-form',
  templateUrl: './UserForm.tpl.html'
})
export class UserFormComponent extends PresentationalComponent implements OnChanges {

  @Input() currentUser;
  @Input() loading;
  @Output() triggerSave = new EventEmitter();

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.pattern('.+@.+')]]
    });
  }

  hasError(fieldName: string, errorName?: string): boolean {
    if (errorName) {
      return !!(this.userForm.controls[fieldName].errors && this.userForm.controls[fieldName].errors[errorName]);
    } else {
      return !!this.userForm.controls[fieldName].errors;
    }
  }

  ngOnChanges(changes) {
    if (this.currentUser) {
      this.userForm.patchValue(this.currentUser.toJS());
    }
  }

  saveUser() {
    let user: any = this.currentUser.merge(fromJS(this.userForm.value));
    if (this.userForm.valid && (!user.equals(this.currentUser))) {
      this.triggerSave.next(user);
    }
  }

}
