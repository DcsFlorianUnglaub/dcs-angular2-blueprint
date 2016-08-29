import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgRedux } from 'ng2-redux';

import { routes } from './App.routes';

import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { CurrentUserPageComponent } from './users/currentUserPage/CurrentUserPage.component';
import { UserFormComponent } from './users/userForm/UserForm.component';
import { UsersListComponent } from './users/usersList/UsersList.component';

import { RestClient } from './base/restClient';
import { UsersActions } from './backend/users/Users.actions';


@NgModule({
  declarations: [
    UsersPageComponent,
    CurrentUserPageComponent,
    UsersListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    NgRedux,
    RestClient,
    UsersActions
  ]
})
export class AppModule { }
