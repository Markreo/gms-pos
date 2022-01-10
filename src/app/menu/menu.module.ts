import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {MenuEffects} from './data-access/menu.effects';
import {StoreModule} from '@ngrx/store';
import {menuFeatureKey, menuReducer} from './data-access/menu.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(menuFeatureKey, menuReducer),
    EffectsModule.forFeature([MenuEffects])
  ]
})
export class MenuModule {
}
