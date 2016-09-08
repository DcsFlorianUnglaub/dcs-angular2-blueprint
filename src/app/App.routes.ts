import { provideRoutes, Route } from '@angular/router';

import { SetupCompletedGuard } from './shared/guards/SetupCompleted.guard';

import { HomeComponent } from './home/Home.component';
import { NotFoundComponent } from './notFound/NotFound.component';


export const routes: Array<Route> = [
  { path: '', component: HomeComponent, canActivate: [SetupCompletedGuard] },
  { path: '**', component: NotFoundComponent, canActivate: [SetupCompletedGuard] },
];

export const appRouterProviders = [
  provideRoutes(routes)
];
