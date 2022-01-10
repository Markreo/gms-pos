import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from './order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.OrderState>(
  fromOrder.orderFeatureKey
);
