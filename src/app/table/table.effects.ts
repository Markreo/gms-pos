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
import {logout} from '../auth/data-access/auth.actions';
import {setLastTable} from './table.actions';
import {StorageService} from '../ionic-storage/storage.service';


@Injectable()
export class TableEffects {

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    map(() => TableActions.initTables())
  ));

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

  selectTable$ = createEffect(() => this.actions$.pipe(
    ofType(TableActions.selectTable),
    concatLatestFrom(() => this.store.select(selectCurrentGolfClub)),
    switchMap(([action, golfC]) => this.tableService.get(golfC.id, action.id).pipe(
      map(table => TableActions.cloneTableSuccess({table})),
      catchError((error) => of(TableActions.loadTablesFailure({error})))
    )),
  ));


  setLastTable = createEffect(() => this.actions$.pipe(
    ofType(TableActions.selectTable),
    map((action) => TableActions.setLastTable({table: {id: action.id}}))
  ));

  saveLastTable = createEffect(() => this.actions$.pipe(
    ofType(TableActions.setLastTable),
    tap((action) => {
      this.storageService.set('LAST_TABLE', action.table);
    })
  ), {dispatch: false});

  removeLastTable = createEffect(() => this.actions$.pipe(
    ofType(TableActions.removeLastTable),
    tap((action) => {
      this.storageService.remove('LAST_TABLE');
    })
  ), {dispatch: false});


  constructor(private actions$: Actions, private store: Store, private tableService: TableService, private storageService: StorageService) {
  }

}
