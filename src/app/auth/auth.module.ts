import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './data-access/auth.effects';
import {StoreModule} from '@ngrx/store';
import {authFeatureKey, authReducer} from './data-access/auth.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
}
