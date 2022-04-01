import {createAction, props} from '@ngrx/store';
import {GolfClub} from '../../golf-club/models/golf-club.model';
import {Location} from './location';

export const initLocations = createAction('[Location] init Locations');
export const loadLocations = createAction('[Location] Load Locations', props<{ golfClub: GolfClub }>());

export const loadLocationsSuccess = createAction('[Location] Load Locations Success', props<{ data: Location[]; total: number }>());

export const loadLocationsFailure = createAction(
  '[Location] Load Locations Failure',
  props<{ error: any }>()
);

export const setCurrentLocation = createAction('[Location] set current Location', props<{ location: Location }>());

export const findSavedLocation = createAction('[Location] find saved Location');
