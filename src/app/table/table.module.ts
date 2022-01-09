import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {TableEffects} from './table.effects';
import {TableService} from './table.service';
import {tableFeatureKey, tableReducer} from './table.reducer';
import {StoreModule} from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(tableFeatureKey, tableReducer),
    EffectsModule.forFeature([TableEffects])
  ],
  providers: [TableService]
})
export class TableModule {
}
