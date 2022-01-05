import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {GolfClubEffects} from './data-access/effects/golf-club.effects';
import {StoreModule} from '@ngrx/store';
import {golfClubFeatureKey, golfClubReducer} from './data-access/reducers/golf-club.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(golfClubFeatureKey, golfClubReducer),
    EffectsModule.forFeature([GolfClubEffects])
  ]
})
export class GolfClubModule {
}
