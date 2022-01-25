import {Action, createReducer, on} from '@ngrx/store';
import * as TableActions from './table.actions';
import {Table} from './table';

export const tableFeatureKey = 'table';

export interface TableState {
  tables: Table[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  filterObject: {
    search: string;
  };
  currentTable: Table;
}

export const initialState: TableState = {
  tables: [],
  status: 'idle',
  filterObject: {
    search: ''
  },
  currentTable: null
};

export const tableReducer = createReducer(
  initialState,

  on(TableActions.loadTables, state => ({...state, status: 'loading'})),
  on(TableActions.loadTablesSuccess, (state, action) => ({...state, status: 'loaded', tables: action.data})),
  on(TableActions.loadTablesFailure, (state, action) => ({...state, status: 'error'})),
  on(TableActions.searchTable, (state, action) => ({
    ...state,
    status: 'loading',
    tables: [],
    filterObject: {search: action.search}
  })),
  on(TableActions.cloneTableSuccess, (state, action) => ({...state, status: 'loaded', currentTable: action.table}))
);
