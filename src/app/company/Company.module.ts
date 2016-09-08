import { CompanyComponent } from './Company.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/Shared.module';
import { companyRouting } from './Company.routes';
import { AboutUsComponent } from './aboutUs/AboutUs.component';
import { ImprintComponent } from './imprint/Imprint.component';
import { MainComponent } from './main/Main.component';


@NgModule({
  declarations: [
    CompanyComponent,
    MainComponent,
    ImprintComponent,
    AboutUsComponent
  ],
  imports: [
    SharedModule,
    companyRouting
  ]
})
export class CompanyModule { }
