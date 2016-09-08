import { CompanyComponent } from './Company.component';
import { NgModule } from '@angular/core';

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
    companyRouting
  ]
})
export class CompanyModule { }
