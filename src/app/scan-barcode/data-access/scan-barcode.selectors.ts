import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScanBarcode from './scan-barcode.reducer';

export const selectScanBarcodeState = createFeatureSelector<fromScanBarcode.ScanBarcodeState>(
  fromScanBarcode.scanBarcodeFeatureKey
);

export const isScanning = createSelector(selectScanBarcodeState, state => state?.status === 'scanning');
