import {createAction, props} from '@ngrx/store';
import {Table} from './table';

export const initTables = createAction('[Table] init table');

export const setLastTable = createAction('[Table] set last table', props<{ table: { id: string } }>());
export const removeLastTable = createAction('[Table] remove last table');

export const loadTables = createAction(
  '[Table] Load Tables'
);

export const loadTablesSuccess = createAction(
  '[Table] Load Tables Success',
  props<{ data: Table[] }>()
);

export const loadTablesFailure = createAction(
  '[Table] Load Tables Failure',
  props<{ error: any }>()
);

export const searchTable = createAction(
  '[Table] Search Table',
  props<{ search: string }>()
);

export const selectTable = createAction(
  '[Table] select table',
  props<{ id: string }>()
);

export const cloneTableSuccess = createAction(
  '[Table] clone table success',
  props<{ table: Table }>()
);


