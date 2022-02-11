import {createReducer, on} from '@ngrx/store';
import * as GuestActions from './guest.actions';
import {Guest} from '../../order/models/guest';

export const guestFeatureKey = 'guest';

export interface GuestState {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  guest: Guest;
  guests: Guest[];
  filterObject: {
    search: string;
    page: number;
  };
  focus: boolean;
}

export const initialState: GuestState = {
  status: 'idle',
  guest: null,
  guests: [],
  filterObject: {
    search: '',
    page: 0,
  },
  focus: false
};

export const guestReducer = createReducer(
  initialState,
  on(GuestActions.initGuest, (state, action) => ({...state, guest: action.guest})),
  on(GuestActions.inputSearch, (state, action) => ({
    ...state,
    filterObject: {...state.filterObject, search: action.search, page: 0},
    focus: true,
    status: 'loading'
  })),
  on(GuestActions.loadGuests, (state) => ({...state, status: 'loading'})),
  on(GuestActions.clearSearch, state => ({
    ...state,
    filterObject: {...state.filterObject, search: '', page: 0},
    focus: false,
    status: 'idle'
  })),
  on(GuestActions.loadGuestsSuccess, (state, action) => ({...state, guests: action.guests, status: 'loaded'})),
  on(GuestActions.loadGuestsFailure, (state, action) => ({...state, status: 'error'})),
  on(GuestActions.setGuest, (state, action) => ({
    ...state,
    guest: action.guest,
    focus: false,
    filterObject: {search: '', page: 0}
  }))
);
