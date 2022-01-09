import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as GolfClubActions from '../actions/golf-club.actions';
import {GolfClubService} from '../../services/golf-club.service';
import * as AuthActions from '../../../auth/data-access/auth.actions';


@Injectable()
export class GolfClubEffects {

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map(() => GolfClubActions.loadGolfClubs())
  ));


  loadGolfClubs$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.loadGolfClubs),
    switchMap(() => this.golfClubService.getAllByUser().pipe(
      map(data => GolfClubActions.loadGolfClubsSuccess({data})),
      catchError(error => of(GolfClubActions.loadGolfClubsFailure({error})))))
  ));

  constructor(private actions$: Actions, private golfClubService: GolfClubService) {
    console.log('GolfClubEffects');
  }
}
