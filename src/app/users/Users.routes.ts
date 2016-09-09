import { CancelEditGuard } from '../shared/guards/CancelEdit.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupCompletedGuard } from '../shared/guards/SetupCompleted.guard';

import { CurrentUserPageComponent } from './currentUserPage/CurrentUserPage.component';
import { NewUserPageComponent } from './newUserPage/NewUserPage.component';
import { UsersPageComponent } from './usersPage/UsersPage.component';


const usersRoutes: Routes = [
  { path: 'users', component: UsersPageComponent, canActivate: [SetupCompletedGuard] },
  { path: 'users/new', component: NewUserPageComponent, canActivate: [SetupCompletedGuard], canDeactivate: [CancelEditGuard] },
  { path: 'users/:id', component: CurrentUserPageComponent, canActivate: [SetupCompletedGuard], canDeactivate: [CancelEditGuard] },
];

export const usersRouting: ModuleWithProviders = RouterModule.forChild(usersRoutes);
