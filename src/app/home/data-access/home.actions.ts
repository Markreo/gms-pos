import { createAction, props } from '@ngrx/store';

export const loadHomes = createAction(
  '[Home] Load Homes'
);

export const loadHomesSuccess = createAction(
  '[Home] Load Homes Success',
  props<{ data: any }>()
);

export const loadHomesFailure = createAction(
  '[Home] Load Homes Failure',
  props<{ error: any }>()
);
