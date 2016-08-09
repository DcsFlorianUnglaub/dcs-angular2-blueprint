import { UserPageComponent } from './users/userPage/UserPage.component';
import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { provideRouter, RouterConfig } from '@angular/router';

const routes: RouterConfig = [
  { path: 'users', component: UsersPageComponent },
  { path: 'users/:id', component: UserPageComponent },

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

export const appRouterProviders = [
  provideRouter(routes)
];
