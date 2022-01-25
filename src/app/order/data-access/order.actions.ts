import {createAction, props} from '@ngrx/store';
import {Order} from '../models/order';
import {OrderItem} from '../models/order-item';
import {Guest} from '../models/guest';
import {Variant} from '../../product/models/variant';
import {Table} from "../../table/table";

export const loadOrder = createAction('[Order] Load Order', props<{ id?: string }>());
export const setTable = createAction('[Order] Set table', props<{ table: Table }>());

export const loadOrderSuccess = createAction('[Order] Load Order Success', props<{ order: Partial<Order> }>());
export const loadOrderFailure = createAction('[Order] Load Order Failure', props<{ error: any }>());

export const addVariant = createAction('[Order] add variant', props<{ variant: Variant }>());

export const addNewOrderItem = createAction('[Order] add Item', props<{ item: OrderItem }>());
export const updateOrderItem = createAction('[Order] update Item', props<{ index: number; item: OrderItem }>());
export const deleteOrderItem = createAction('[Order] delete Item', props<{ item: OrderItem }>());

export const addGuest = createAction('[Order] Add guest', props<{ guest: Guest }>());
export const addGuestSuccess = createAction('[Order] add Guest success', props<{ order: Order }>());

export const submitOrder = createAction('[Order] submit Order');
export const checkoutOrder = createAction('[Order] checkout Order');
export const actionOrderSuccess = createAction('[Order] Action update success', props<{ order: Order }>());
export const actionOrderFailure = createAction('[Order] Action update failure', props<{ error: any }>());

