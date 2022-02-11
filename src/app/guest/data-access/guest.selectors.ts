import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGuest from './guest.reducer';

export const selectGuestState = createFeatureSelector<fromGuest.GuestState>(
  fromGuest.guestFeatureKey
);
export const selectSearchGuestStr = createSelector(selectGuestState, state => state.filterObject.search);
export const selectGuest = createSelector(selectGuestState, state => state.guest);
export const selectGuestFilterObject = createSelector(selectGuestState, state => state.filterObject);
export const selectGuestFocus = createSelector(selectGuestState, state => state.focus);
export const selectGuestStatus = createSelector(selectGuestState, state => state.status);
export const selectListGuests = createSelector(selectGuestState, state => state.guests);
export const selectCurrentGuest = createSelector(selectGuestState, state => state.guest);
