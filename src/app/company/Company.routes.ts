import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './Company.component';
import { MainComponent } from './main/Main.component';
import { AboutUsComponent } from './aboutUs/AboutUs.component';
import { ImprintComponent } from './imprint/Imprint.component';


const companyRoutes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,

    children: [
      { path: '', redirectTo: 'main' },
      { path: 'main', component: MainComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'imprint', component: ImprintComponent }
    ]
 },
];

export const companyRouting: ModuleWithProviders = RouterModule.forChild(companyRoutes);
