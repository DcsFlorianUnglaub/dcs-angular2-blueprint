import { provideRoutes, Route } from '@angular/router';

import { SetupCompletedGuard } from './base/guards/SetupCompleted.guard';

import { HomeComponent } from './home/Home.component';
import { NotFoundComponent } from './notFound/NotFound.component';
import { CurrentUserPageComponent } from './users/currentUserPage/CurrentUserPage.component';
import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { NewUserPageComponent } from './users/newUserPage/NewUserPage.component';
import { MealsPageComponent } from './meals/mealsPage/MealsPage.component';


export const routes: Array<Route> = [
  { path: 'users', component: UsersPageComponent, canActivate: [SetupCompletedGuard] },
  { path: 'users/new', component: NewUserPageComponent, canActivate: [SetupCompletedGuard] },
  { path: 'users/:id', component: CurrentUserPageComponent, canActivate: [SetupCompletedGuard] },
  { path: 'meals', component: MealsPageComponent, canActivate: [SetupCompletedGuard] },

  { path: '', component: HomeComponent, canActivate: [SetupCompletedGuard] },
  { path: '**', component: NotFoundComponent, canActivate: [SetupCompletedGuard] },
];

export const appRouterProviders = [
  provideRoutes(routes)
];
