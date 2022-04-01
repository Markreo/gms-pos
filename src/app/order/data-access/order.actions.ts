import {createAction, props} from '@ngrx/store';
import {Order} from '../models/order';
import {OrderItem} from '../models/order-item';
import {Guest} from '../models/guest';
import {Variant} from '../../product/models/variant';
import {Table} from '../../table/table';

export const loadOrder = createAction('[Order] Load Order', props<{ id?: string }>());
export const setTable = createAction('[Order] Set table', props<{ table: Table }>());

export const loadOrderSuccess = createAction('[Order] Load Order Success', props<{ order: Partial<Order> }>());
export const loadOrderFailure = createAction('[Order] Load Order Failure', props<{ error: any }>());

export const addVariant = createAction('[Order] add variant', props<{ variant: Variant }>());

export const addNewOrderItem = createAction('[Order] add Item', props<{ item: OrderItem }>());
export const deleteOrderItem = createAction('[Order] delete Item', props<{ index: number; item: OrderItem }>());
export const applyVoucherOrderItem = createAction('[Order] applyVoucherOrderItem', props<{ item: OrderItem }>());
export const updateOrderItemSuccess = createAction('[Order] update Item Success', props<{ index: number; item: OrderItem }>());

export const submitOrder = createAction('[Order] submit Order');
export const checkoutOrder = createAction('[Order] checkout Order');
export const actionOrderSuccess = createAction('[Order] Action update success', props<{ order: Order }>());
export const actionOrderFailure = createAction('[Order] Action update failure', props<{ error: any }>());

export const setPaymentType = createAction('[Order] set Payment type', props<{ paymentType: 'WITH_GOLF' | 'CITY_LEDGER' | 'CASH' | 'VOUCHER' }>());
export const setGuestOfOrder = createAction('[Order] set guest', props<{ guest: Guest }>());
export const setGuestOfOrderSuccess = createAction('[Order] set guest', props<{ guest: Guest }>());

export const scanBagtag  = createAction('[Order] scan bagtag', props<{bagtag: string}>());

export const wsAddOrder = createAction('[Order] Websocket add order', props<{order: Order}>());
export const wsUpdateOrder = createAction('[Order] Websocket update order', props<{order: Order}>());
export const wsDoneOrder = createAction('[Order] Websocket done order', props<{order: Order}>());
