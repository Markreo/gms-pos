import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as TableActions from './table.actions';
import * as LocationActions from '../location/data-access/location.actions';
import {Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../golf-club/data-access/selectors/golf-club.selectors';
import {selectCurrentLocation} from '../location/data-access/location.selectors';
import {TableService} from './table.service';


@Injectable()
export class TableEffects {

  setCurrentLocation = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => TableActions.loadTables())
  ));

  searchTable$ = createEffect(() => this.actions$.pipe(
    ofType(TableActions.searchTable),
    map(() => TableActions.loadTables())
  ));

  loadTables$ = createEffect(() => this.actions$.pipe(
    ofType(TableActions.loadTables),
    concatLatestFrom(() => [
        this.store.select(selectCurrentGolfClub),
        this.store.select(selectCurrentLocation)
      ]
    ),
    switchMap(([action, currentGolfClub, currentLocation]) => this.tableService.getAll(currentGolfClub.id, currentLocation.id, '').pipe(
      map(data => TableActions.loadTablesSuccess({data})),
      catchError(error => of(TableActions.loadTablesFailure({error})))
    ))
  ));


  constructor(private actions$: Actions, private store: Store, private tableService: TableService) {
  }

}
