import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromJS } from 'immutable';

import { validateEmail, validatePhone, validateFQDN } from '../../utils/validators';
import { PresentationalComponent } from '../../shared/component/PresentationalComponent';


@Component({
  selector: 'dcs-user-form',
  templateUrl: './UserForm.tpl.html'
})
export class UserFormComponent extends PresentationalComponent implements OnChanges {

  @Input() currentUser;
  @Input() loading;
  @Input() saving;
  @Output() triggerSave: EventEmitter<any> = new EventEmitter();
  @Output() updateFormData: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    super();

    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [validatePhone]],
      website: ['', [validateFQDN]],

      address: this.fb.group({
        street: ['', [Validators.required]],
        suite: [''],
        city: ['', [Validators.required]],
        zipcode: ['', [Validators.required]]
      }),

      company: this.fb.group({
        name: ['', [Validators.required]],
        catchPhrase: ['', [Validators.required]],
        bs: ['']
      })
    });

    this.userForm
      .valueChanges
      .debounceTime(500)
      .map(data => fromJS(data))
      .distinctUntilChanged((oldData, newData): boolean => newData.equals(oldData))
      .subscribe(data => {
        this.updateFormData.next({
          formData: data,
          dirty: this.userForm.dirty
        });
      });
  }

  ngOnChanges(changes) {
    if (this.currentUser) {
      this.userForm.patchValue(this.currentUser.toJS());
    }
  }

  saveUser() {
    let user: any = this.currentUser.merge(fromJS(this.userForm.value));
    if (this.userForm.valid && this.userForm.dirty) {
      this.triggerSave.next(user);
    }
  }

}
