import {createAction, props} from '@ngrx/store';
import {Order} from '../models/order';
import {OrderItem} from '../models/order-item';
import {Guest} from '../models/guest';

export const loadOrder = createAction('[Order] Load Order', props<{ id: string }>());

export const loadOrderSuccess = createAction('[Order] Load Order Success', props<{ order: Order }>());

export const loadOrderFailure = createAction('[Order] Load Order Failure', props<{ error: any }>());


export const addItem = createAction('[Order] add Item', props<{ item: OrderItem }>());
export const addItemSuccess = createAction('[Order] add Item success', props<{ order: Order }>());

export const addGuest = createAction('[Order] Add guest', props<{ guest: Guest }>());
export const addGuestSuccess = createAction('[Order] add Guest success', props<{ order: Order }>());

