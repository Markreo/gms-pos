import { createAction, props } from '@ngrx/store';
import {Guest} from '../../order/models/guest';
export const initGuest = createAction('[Guest] init guest', props<{guest: Guest}>());
export const inputSearch = createAction('[Guest] input search', props<{search: string}>());
// export const scrollNextPage = createAction('[Guest] scroll next page');
export const clearSearch = createAction('[Guest] clear search');
export const setGuest = createAction('[Guest] set guest', props<{guest: Guest}>());

export const loadGuests = createAction(
  '[Guest] Load Guests'
);

export const loadGuestsSuccess = createAction(
  '[Guest] Load Guests Success',
  props<{ guests: any }>()
);

export const loadGuestsFailure = createAction(
  '[Guest] Load Guests Failure',
  props<{ error: any }>()
);
