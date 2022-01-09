import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGolfClub from '../reducers/golf-club.reducer';

export const selectGolfClubState = createFeatureSelector<fromGolfClub.GolfClubState>(
  fromGolfClub.golfClubFeatureKey
);

export const selectCurrentGolfClub = createSelector(selectGolfClubState, state => state.currentGolfClub);
export const selectGolfClubs = createSelector(selectGolfClubState, state => state.golfClubs);
