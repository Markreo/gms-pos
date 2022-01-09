import {createReducer, on} from '@ngrx/store';
import * as LocationActions from './location.actions';
import {Location} from './location';

export const locationFeatureKey = 'location';

export interface State {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  locations: Location[];
  total: number;
  currentLocation: Location;
}

export const initialState: State = {
  status: 'idle',
  locations: [],
  total: 0,
  currentLocation: null
};

export const locationReducer = createReducer(
  initialState,

  on(LocationActions.loadLocations, state => ({...state, status: 'loading'})),
  on(LocationActions.loadLocationsSuccess, (state, action) => ({
    ...state,
    status: 'loaded',
    total: action.total,
    locations: action.data
  })),
  on(LocationActions.loadLocationsFailure, (state, action) => ({...state, status: 'error'})),
  on(LocationActions.setCurrentLocation, (state, action) => ({...state, currentLocation: action.location}))
);
