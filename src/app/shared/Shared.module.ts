import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';

import { PricePipe } from './pipes/Price.pipe';
import { FormBlockComponent } from './components/formBlock/FormBlock.component';
import { RestClient } from './services/RestClient';
import { APP_SETTINGS, settings } from '../settings';
import { CancelEditGuard } from './guards/CancelEdit.guard';


@NgModule({
  declarations: [
    PricePipe,
    FormBlockComponent
  ],
  providers: [
    RestClient,
    CancelEditGuard,
    { provide: APP_SETTINGS, useValue: settings }
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
    FormBlockComponent
  ]
})
export class SharedModule { }
