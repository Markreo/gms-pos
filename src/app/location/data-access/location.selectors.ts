import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLocation from './location.reducer';

export const selectLocationState = createFeatureSelector<fromLocation.State>(
  fromLocation.locationFeatureKey
);

export const selectCurrentLocation = createSelector(selectLocationState, state => state.currentLocation);
export const selectLocations = createSelector(selectLocationState, state => state.locations);
export const enableMenu = createSelector(selectLocationState, state => state.currentLocation?.enable_menu === true);
