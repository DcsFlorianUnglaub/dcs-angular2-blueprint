import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';

import { PricePipe } from './pipes/Price.pipe';
import { MarkdownPipe } from './pipes/Markdown.pipe';
import { AsyncImmutablePipe } from './pipes/AsyncImmutable.pipe';
import { FormBlockComponent } from './components/formBlock/FormBlock.component';
import { RestClient } from './services/RestClient';
import { APP_SETTINGS, settings } from '../settings';
import { CancelEditGuard } from './guards/CancelEdit.guard';


@NgModule({
  declarations: [
    PricePipe,
    MarkdownPipe,
    AsyncImmutablePipe,
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
    MarkdownPipe,
    AsyncImmutablePipe,
    FormBlockComponent
  ]
})
export class SharedModule { }
