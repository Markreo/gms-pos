import { createAction, props } from '@ngrx/store';
import {OrderItem} from '../../order/models/order-item';

export const startScanBarcode = createAction('[Barcode] start scan', props<{item?: OrderItem; index?: number}>());
export const stopScanBarcode = createAction('[Barcode] stop scan');
