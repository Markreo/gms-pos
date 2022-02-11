import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { GuestEffects } from './data-access/guest.effects';
import {StoreModule} from '@ngrx/store';
import {guestFeatureKey, guestReducer} from './data-access/guest.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(guestFeatureKey, guestReducer),
    EffectsModule.forFeature([GuestEffects])
  ]
})
export class GuestModule { }
