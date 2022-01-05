import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGolfClub from '../reducers/golf-club.reducer';

export const selectGolfClubState = createFeatureSelector<fromGolfClub.GolfClubState>(
  fromGolfClub.golfClubFeatureKey
);
