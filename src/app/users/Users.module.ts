import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/Shared.module';

import { NewUserPageComponent } from './newUserPage/NewUserPage.component';
import { UserFormComponent } from './userForm/UserForm.component';
import { UsersListComponent } from './usersList/UsersList.component';
import { CurrentUserPageComponent } from './currentUserPage/CurrentUserPage.component';
import { UsersPageComponent } from './usersPage/UsersPage.component';

import { UsersActions } from './backend/Users.actions';
import { usersRouting } from './Users.routes';


@NgModule({
  declarations: [
    UsersPageComponent,
    CurrentUserPageComponent,
    UsersListComponent,
    UserFormComponent,
    NewUserPageComponent,
  ],
  providers: [
    UsersActions
  ],
  imports: [
    SharedModule,
    usersRouting
  ]
})
export class UsersModule { }
