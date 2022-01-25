import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from './order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.OrderState>(
  fromOrder.orderFeatureKey
);

export const selectOrder = createSelector(selectOrderState, state => state.order);
export const selectOrderStatus = createSelector(selectOrderState, state => state.status);
export const selectOrderAction = createSelector(selectOrderState, state => state.action);
