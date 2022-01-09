import {createAction, props} from '@ngrx/store';

export const loadTables = createAction(
  '[Table] Load Tables'
);

export const loadTablesSuccess = createAction(
  '[Table] Load Tables Success',
  props<{ data: any }>()
);

export const loadTablesFailure = createAction(
  '[Table] Load Tables Failure',
  props<{ error: any }>()
);

export const searchTable = createAction(
  '[Table] Search Table',
  props<{ search: string }>()
);

