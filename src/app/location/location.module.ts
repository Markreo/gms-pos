import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {LocationEffects} from './data-access/location.effects';
import {Store, StoreModule} from '@ngrx/store';
import {locationFeatureKey, locationReducer} from './data-access/location.reducer';
import {LocationService} from './services/location.service';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from '../my-rx-stomp.config';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(locationFeatureKey, locationReducer),
    EffectsModule.forFeature([LocationEffects])
  ],
  providers: [
    LocationService,
    {
      provide: InjectableRxStompConfig,
      useFactory: myRxStompConfig,
      deps: [Store]
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }]
})
export class LocationModule {
}
