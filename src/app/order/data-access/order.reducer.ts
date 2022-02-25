import {createReducer, on} from '@ngrx/store';
import * as OrderActions from './order.actions';
import {Order} from '../models/order';

export const orderFeatureKey = 'order';

export interface OrderState {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  action: 'idle' | 'add-product' | 'submit' | 'checkout' | 'error';
  order: Order;
}

export const initialState: OrderState = {
  status: 'idle',
  action: 'idle',
  order: null
};

export const orderReducer = createReducer(
  initialState,

  on(OrderActions.loadOrder, state => ({...state, status: 'loading'})),
  on(OrderActions.setTable, (state, action) => ({...state, order: {...state.order, table_map: action.table}})),
  on(OrderActions.loadOrderSuccess, (state, action) => ({...state, status: 'loaded', order: action.order as Order})),
  on(OrderActions.loadOrderFailure, (state, action) => ({...state, status: 'error'})),
  on(OrderActions.addVariant, (state, action) => ({...state, action: 'idle'})),
  on(OrderActions.addNewOrderItem, (state, action) => ({
    ...state,
    order: {...state.order, items: [action.item, ...(state.order.items || [])]}
  })),
  on(OrderActions.updateOrderItemSuccess, (state, action) => ({
    ...state,
    order: {
      ...state.order, items: state.order.items.map((item, idx) => {
        if (action.item.id) {
          if (item.id === action.item.id) {
            return action.item;
          } else {
            return item;
          }
        } else {
          if (idx === action.index) {
            return action.item;
          } else {
            return item;
          }
        }

      })
    }
  })),
  on(OrderActions.deleteOrderItem, (state, action) => ({
    ...state,
    order: {...state.order, items: state.order.items.filter((item, index) => index !== action.index)}
  })),
  on(OrderActions.submitOrder, (state) => ({...state, action: 'submit'})),
  on(OrderActions.submitOrder, (state) => ({...state, action: 'checkout'})),
  on(OrderActions.setPaymentType, (state, action) => ({
    ...state,
    order: {...state.order, payment_type: action.paymentType}
  })),
  on(OrderActions.setGuestOfOrderSuccess, (state, action) => ({
    ...state,
    order: {
      ...state.order,
      guest: action.guest,
      payment_type: state.order.payment_type === 'CASH' ? 'WITH_GOLF' : state.order.payment_type
    }
  })),
  on(OrderActions.actionOrderSuccess, (state, action) => ({
    ...state,
    order: action.order
  }))
);
