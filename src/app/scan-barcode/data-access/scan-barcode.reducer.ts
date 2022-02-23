import { Action, createReducer, on } from '@ngrx/store';
import * as ScanBarcodeActions from './scan-barcode.actions';

export const scanBarcodeFeatureKey = 'scanBarcode';

export interface ScanBarcodeState {
status: 'idle' | 'scanning' |'error';
permission: string;
}

export const initialState: ScanBarcodeState = {
status: 'idle',
  permission: ''
};

export const scanBarcodeReducer = createReducer(
  initialState,

  on(ScanBarcodeActions.startScanBarcode, state => ({...state, status: 'scanning'})),
  on(ScanBarcodeActions.stopScanBarcode, state => ({...state, status: 'idle'})),

);
