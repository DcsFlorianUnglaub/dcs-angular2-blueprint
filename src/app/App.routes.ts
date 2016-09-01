import { provideRoutes, Route } from '@angular/router';

import { HomeComponent } from './home/Home.component';
import { NotFoundComponent } from './notFound/NotFound.component';

import { CurrentUserPageComponent } from './users/currentUserPage/CurrentUserPage.component';
import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { NewUserPageComponent } from './users/newUserPage/NewUserPage.component';
import { MealsPageComponent } from './meals/mealsPage/MealsPage.component';


export const routes: Array<Route> = [
  { path: 'users', component: UsersPageComponent },
  { path: 'users/new', component: NewUserPageComponent },
  { path: 'users/:id', component: CurrentUserPageComponent },
  { path: 'meals', component: MealsPageComponent },

  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

export const appRouterProviders = [
  provideRoutes(routes)
];
