import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as GolfClubActions from '../actions/golf-club.actions';
import {GolfClubService} from '../../services/golf-club.service';


@Injectable()
export class GolfClubEffects implements OnInitEffects {
  loadGolfClubs$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.loadGolfClubs),
    switchMap(() => {
      console.log('here');
      return this.golfClubService.getAllByUser().pipe(
        map(data => GolfClubActions.loadGolfClubsSuccess({data})),
        catchError(error => of(GolfClubActions.loadGolfClubsFailure({error}))));
    })
  ));

  constructor(private actions$: Actions, private golfClubService: GolfClubService) {
    console.log('GolfClubEffects');
  }


  ngrxOnInitEffects() {
    return GolfClubActions.loadGolfClubs();
  }
}
