import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScanBarcodeEffects } from './data-access/scan-barcode.effects';
import {StoreModule} from '@ngrx/store';
import {scanBarcodeFeatureKey, scanBarcodeReducer} from './data-access/scan-barcode.reducer';
import {ScanBarcodeComponent} from './components/scan-barcode/scan-barcode.component';
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [ScanBarcodeComponent],
  exports: [
    ScanBarcodeComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(scanBarcodeFeatureKey, scanBarcodeReducer),
    EffectsModule.forFeature([ScanBarcodeEffects]),
    IonicModule
  ]
})
export class ScanBarcodeModule { }
