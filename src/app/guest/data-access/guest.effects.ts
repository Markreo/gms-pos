import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as GuestActions from './guest.actions';
import {Store} from '@ngrx/store';
import {selectGuestFilterObject} from './guest.selectors';
import {GuestService} from '../services/guest.service';
import {selectCurrentGolfClub} from '../../golf-club/data-access/selectors/golf-club.selectors';
import {loadOrderSuccess} from '../../order/data-access/order.actions';


@Injectable()
export class GuestEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(GuestActions.inputSearch),
    debounceTime(300),
    switchMap(action => of(GuestActions.loadGuests()))
  ));


  loadGuest$ = createEffect(() => this.actions$.pipe(
    ofType(GuestActions.loadGuests),
    concatLatestFrom(() => [this.store.select(selectCurrentGolfClub), this.store.select(selectGuestFilterObject)]),
    switchMap(([action, golfClub, filterObject]) => this.guestService.getAllWithFilter(golfClub.id, filterObject).pipe(
      map(({total, data}) => GuestActions.loadGuestsSuccess({guests: data})),
      catchError(error => of(GuestActions.loadGuestsFailure({error})))
    ))
  ));

  loadOrderSuccess = createEffect(() => this.actions$.pipe(
    ofType(loadOrderSuccess),
    map(action => GuestActions.initGuest({guest: action.order.guest}))
  ));


  constructor(private actions$: Actions, private store: Store, private guestService: GuestService) {
  }

}
