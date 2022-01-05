import {createAction, props} from '@ngrx/store';
import {GolfClub} from '../../models/golf-club.model';

export const loadGolfClubs = createAction('[GolfClub] Load GolfClubs');

export const loadGolfClubsSuccess = createAction('[GolfClub] Load GolfClubs Success', props<{ data: any }>());

export const loadGolfClubsFailure = createAction('[GolfClub] Load GolfClubs Failure', props<{ error: any }>());

export const setCurrentGolfClub = createAction('[GolfClub] Set current Golf Club', props<{ golfClub: GolfClub }>());
