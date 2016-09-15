import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './App.routes';

import { HomeComponent } from './home/Home.component';
import { NotFoundComponent } from './notFound/NotFound.component';

import { SharedModule } from './shared/Shared.module';
import { UsersModule } from './users/Users.module';
import { MealsModule } from './meals/Meals.module';
import { CompanyModule } from './company/Company.module';
import { NotesModule } from './notes/Notes.module';


@NgModule({
  declarations: [
    // components
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    SharedModule,
    UsersModule,
    MealsModule,
    CompanyModule,
    NotesModule
  ]
})
export class AppModule { }
