import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {GolfClubModule} from '../golf-club/golf-club.module';
import {LocationModule} from '../location/location.module';
import {TranslateModule} from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './data-access/home.effects';
import {TableModule} from '../table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GolfClubModule,
    LocationModule,
    ReactiveFormsModule,
    TranslateModule,
    EffectsModule.forFeature([HomeEffects]),
    TableModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
