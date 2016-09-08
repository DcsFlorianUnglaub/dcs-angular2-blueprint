import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupCompletedGuard } from '../shared/guards/SetupCompleted.guard';

import { MealsPageComponent } from './mealsPage/MealsPage.component';


const mealsRoutes: Routes = [
  { path: 'meals', component: MealsPageComponent, canActivate: [SetupCompletedGuard] },
];

export const mealsRouting: ModuleWithProviders = RouterModule.forChild(mealsRoutes);
