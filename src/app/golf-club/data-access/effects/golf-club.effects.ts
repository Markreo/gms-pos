import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, delay, exhaustMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {GolfClubService} from '../../services/golf-club.service';
import {from, of} from 'rxjs';

import * as GolfClubActions from '../actions/golf-club.actions';
import * as AuthActions from '../../../auth/data-access/auth.actions';
import {StorageService} from '../../../ionic-storage/storage.service';
import {selectCurrentGolfClub} from '../selectors/golf-club.selectors';


@Injectable()
export class GolfClubEffects {

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map(() => GolfClubActions.loadGolfClubs())
  ));


  loadGolfClubs$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.loadGolfClubs),
    switchMap(() => this.golfClubService.getAllByUser().pipe(
      tap(golfClubs => {
      }),
      map(data => GolfClubActions.loadGolfClubsSuccess({data})),
      catchError(error => of(GolfClubActions.loadGolfClubsFailure({error})))))
  ));

  setCurrentGolfClub$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.setCurrentGolfClub),
    concatLatestFrom(() => this.store.select(selectCurrentGolfClub)),
    filter(([action,]) => !!action.golfClub),
    tap(([action,]) => this.storageService.set('GOLF_CLUB', action.golfClub))
  ), {dispatch: false});

  loadGolfClubsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.loadGolfClubsSuccess),
    concatLatestFrom(() => this.store.select(selectCurrentGolfClub)),
    filter(([, currentGolfClub]) => !currentGolfClub),
    map(() => GolfClubActions.findSavedGolfClub())
  ));


  findSavedGolfClub$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.findSavedGolfClub),
    delay(10),
    exhaustMap(() => from(this.storageService.get('GOLF_CLUB'))),
    concatLatestFrom(() => this.store.select(selectCurrentGolfClub)),
    filter(([golfCub, currentGolfClub]) => !!golfCub && (!currentGolfClub || golfCub.id === currentGolfClub.id)),
    map(([golfClub,]) => GolfClubActions.setCurrentGolfClub({golfClub}))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    map(action => GolfClubActions.initGolfClubState())
  ));


  constructor(private actions$: Actions,
              private golfClubService: GolfClubService,
              private store: Store,
              private storageService: StorageService) {
    console.log('GolfClubEffects');
  }
}
