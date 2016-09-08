import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';

import { PricePipe } from './pipes/Price.pipe';
import { FormBlockComponent } from './components/formBlock/FormBlock.component';
import { RestClient } from './services/RestClient';


@NgModule({
  declarations: [
    PricePipe,
    FormBlockComponent
  ],
  providers: [
    RestClient
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule
  ],
  exports: [
    // Angular
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule,
    // Shared app stuff
    PricePipe,
    FormBlockComponent,
    // RestClient
  ]
})
export class SharedModule { }
