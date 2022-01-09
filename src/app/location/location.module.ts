import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from './data-access/location.effects';
import {StoreModule} from '@ngrx/store';
import {locationFeatureKey, locationReducer} from './data-access/location.reducer';
import {LocationService} from './services/location.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(locationFeatureKey, locationReducer),
    EffectsModule.forFeature([LocationEffects])
  ],
  providers: [LocationService]
})
export class LocationModule {
}
