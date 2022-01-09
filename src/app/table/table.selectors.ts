import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTable from './table.reducer';

export const selectTableState = createFeatureSelector<fromTable.TableState>(
  fromTable.tableFeatureKey
);

export const selectTables = createSelector(selectTableState, state => state?.tables);
export const selectTableStatus = createSelector(selectTableState, state => state?.status);
