import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';

import * as OrderActions from './order.actions';


@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.loadOrder),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(order => OrderActions.loadOrderSuccess({order})),
          catchError(error => of(OrderActions.loadOrderFailure({error}))))
      )
    );
  });


  constructor(private actions$: Actions) {
  }

}
