import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { provideRouter, RouterConfig } from '@angular/router';

const routes: RouterConfig = [
  { path: 'users', component: UsersPageComponent },

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

export const appRouterProviders = [
  provideRouter(routes)
];
