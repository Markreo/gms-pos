import {Action, createReducer, on} from '@ngrx/store';
import * as GolfClubActions from '../actions/golf-club.actions';
import {GolfClub} from '../../models/golf-club.model';

export const golfClubFeatureKey = 'golfClub';

export interface GolfClubState {
  golfClubs: GolfClub[];
  total: number;
  currentGolfClub: GolfClub;
}

export const initialState: GolfClubState = {
  golfClubs: [],
  total: 0,
  currentGolfClub: null
};

export const golfClubReducer = createReducer(
  initialState,

  on(GolfClubActions.loadGolfClubs, state => state),
  on(GolfClubActions.loadGolfClubsSuccess, (state, action) => state),
  on(GolfClubActions.loadGolfClubsFailure, (state, action) => state),
);
