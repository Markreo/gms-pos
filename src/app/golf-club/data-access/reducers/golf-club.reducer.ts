import {Action, createReducer, on} from '@ngrx/store';
import * as GolfClubActions from '../actions/golf-club.actions';
import {GolfClub} from '../../models/golf-club.model';

export const golfClubFeatureKey = 'golfClub';

export interface GolfClubState {
  golfClubs: GolfClub[];
  total: number;
  currentGolfClub: GolfClub;
  status: 'idle' | 'loading' | 'loaded' | 'error';
}

export const initialState: GolfClubState = {
  golfClubs: [],
  total: 0,
  currentGolfClub: null,
  status: 'idle'
};

export const golfClubReducer = createReducer(
  initialState,

  on(GolfClubActions.loadGolfClubs, state => ({...state, status: 'loading'})),
  on(GolfClubActions.loadGolfClubsSuccess, (state, action) => ({...state, status: 'loaded', golfClubs: action.data})),
  on(GolfClubActions.loadGolfClubsFailure, (state, action) => ({...state, status: 'error'})),
  on(GolfClubActions.setCurrentGolfClub, (state, action) => ({...state, currentGolfClub: action.golfClub})),
);
