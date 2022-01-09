import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import {  EMPTY, of } from 'rxjs';

import * as HomeActions from './home.actions';



@Injectable()
export class HomeEffects {

  loadHomes$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(HomeActions.loadHomes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => HomeActions.loadHomesSuccess({ data })),
          catchError(error => of(HomeActions.loadHomesFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
