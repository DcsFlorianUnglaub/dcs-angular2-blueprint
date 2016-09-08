import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgRedux } from 'ng2-redux';

import { routes } from './App.routes';

import { HomeComponent } from './home/Home.component';
import { NotFoundComponent } from './notFound/NotFound.component';
import { UsersPageComponent } from './users/usersPage/UsersPage.component';
import { CurrentUserPageComponent } from './users/currentUserPage/CurrentUserPage.component';
import { UserFormComponent } from './users/userForm/UserForm.component';
import { UsersListComponent } from './users/usersList/UsersList.component';
import { NewUserPageComponent } from './users/newUserPage/NewUserPage.component';
import { MealsPageComponent } from './meals/mealsPage/MealsPage.component';
import { MealsGridComponent } from './meals/mealsGrid/MealsGrid.component';
import { FormBlockComponent } from './users/formBlock/FormBlock.component';

import { PriceTooltipDirective } from './meals/priceTooltip/PriceTooltip.directive';

import { PricePipe } from './utils/pipes';

import { RestClient } from './base/restClient';
import { UsersActions } from './backend/users/Users.actions';
import { MealsActions } from './backend/meals/Meals.actions';

import { CompanyModule } from './company/Company.module';


@NgModule({
  declarations: [
    // components
    HomeComponent,
    NotFoundComponent,
    UsersPageComponent,
    CurrentUserPageComponent,
    UsersListComponent,
    UserFormComponent,
    NewUserPageComponent,
    MealsPageComponent,
    MealsGridComponent,
    FormBlockComponent,
    // directives
    PriceTooltipDirective,
    // pipes
    PricePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CompanyModule
  ],
  providers: [
    NgRedux,
    RestClient,
    UsersActions,
    MealsActions
  ]
})
export class AppModule { }
