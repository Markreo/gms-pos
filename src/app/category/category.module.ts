import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {CategoryEffects} from './data-access/category.effects';
import {StoreModule} from '@ngrx/store';
import {categoryFeatureKey, categoryReducer} from './data-access/category.reducer';
import {CategoryService} from './services/category.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(categoryFeatureKey, categoryReducer),
    EffectsModule.forFeature([CategoryEffects])
  ],
  providers: [CategoryService]
})
export class CategoryModule {
}
