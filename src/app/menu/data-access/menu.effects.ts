import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as MenuActions from './menu.actions';



@Injectable()
export class MenuEffects {

  loadMenus$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(MenuActions.loadMenus),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => MenuActions.loadMenusSuccess({ data })),
          catchError(error => of(MenuActions.loadMenusFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
