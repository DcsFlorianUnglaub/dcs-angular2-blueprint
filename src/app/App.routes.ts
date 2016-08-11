import { CurrentUserPageComponent } from './users/currentUserPage/CurrentUserPage.component';
import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { provideRouter, RouterConfig } from '@angular/router';

export const routes: RouterConfig = [
  { path: 'users', component: UsersPageComponent },
  { path: 'users/:id', component: CurrentUserPageComponent },

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

export const appRouterProviders = [
  provideRouter(routes)
];
