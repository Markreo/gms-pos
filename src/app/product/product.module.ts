import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './data-access/product.effects';
import {StoreModule} from '@ngrx/store';
import {productFeatureKey, productReducer} from './data-access/product.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ]
})
export class ProductModule { }
