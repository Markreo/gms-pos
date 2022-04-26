import {Action, createReducer, on} from '@ngrx/store';
import * as ScanBarcodeActions from './scan-barcode.actions';
import {OrderItem} from '../../order/models/order-item';

export const scanBarcodeFeatureKey = 'scanBarcode';

export interface ScanBarcodeState {
  status: 'idle' | 'scanning' | 'error';
  permission: string;
  item: OrderItem;
  index: number;
}

export const initialState: ScanBarcodeState = {
  status: 'idle',
  permission: '',
  item: null,
  index: -1
};

export const scanBarcodeReducer = createReducer(
  initialState,

  on(ScanBarcodeActions.startScanBarcode, (state, action) => ({
    ...state,
    status: 'scanning',
    item: action.item,
    index: action.index
  })),
  on(ScanBarcodeActions.stopScanBarcode, state => ({...state, status: 'idle', item: null, index: -1})),
);
