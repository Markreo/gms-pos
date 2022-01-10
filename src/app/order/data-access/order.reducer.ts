import {createReducer, on} from '@ngrx/store';
import * as OrderActions from './order.actions';
import {Order} from '../models/order';

export const orderFeatureKey = 'order';

export interface OrderState {
  status: 'idle' | 'loading' | 'loaded';
  action: 'idle' | 'submit' | 'checkout';
  order: Order;
}

export const initialState: OrderState = {
  status: 'idle',
  action: 'idle',
  order: null
};

export const orderReducer = createReducer(
  initialState,

  on(OrderActions.loadOrder, state => state),
  on(OrderActions.loadOrderSuccess, (state, action) => state),
  on(OrderActions.loadOrderFailure, (state, action) => state),
);
