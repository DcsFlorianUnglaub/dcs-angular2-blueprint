import { provideRouter, RouterConfig } from '@angular/router';

import { CurrentUserPageComponent } from './users/currentUserPage/CurrentUserPage.component';
import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { NewUserPageComponent } from './users/newUserPage/NewUserPage.component';

export const routes: RouterConfig = [
  { path: 'users', component: UsersPageComponent },
  { path: 'users/new', component: NewUserPageComponent },
  { path: 'users/:id', component: CurrentUserPageComponent },

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

export const appRouterProviders = [
  provideRouter(routes)
];
