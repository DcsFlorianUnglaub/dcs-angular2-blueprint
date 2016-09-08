import { MealsActions } from './backend/Meals.actions';
import { NgModule } from '@angular/core/src/metadata';

import { SharedModule } from '../shared/Shared.module';

import { PriceTooltipDirective } from './priceTooltip/PriceTooltip.directive';
import { MealsGridComponent } from './mealsGrid/MealsGrid.component';
import { MealsPageComponent } from './mealsPage/MealsPage.component';

import { mealsRouting } from './Meals.routes';


@NgModule({
  declarations: [
    MealsPageComponent,
    MealsGridComponent,
    // directives
    PriceTooltipDirective,
  ],
  providers: [
    MealsActions
  ],
  imports: [
    SharedModule,
    mealsRouting
  ]
})
export class MealsModule { }
