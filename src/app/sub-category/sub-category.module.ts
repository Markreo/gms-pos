import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SubCategoryEffects } from './data-access/sub-category.effects';
import {Store, StoreModule} from '@ngrx/store';
import {subCategoryFeatureKey, subCategoryReducer} from './data-access/sub-category.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(subCategoryFeatureKey, subCategoryReducer),
    EffectsModule.forFeature([SubCategoryEffects])
  ]
})
export class SubCategoryModule { }
