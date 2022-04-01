import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, concatMap, debounceTime, delay, exhaustMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {from, of} from 'rxjs';

import * as LocationActions from './location.actions';
import {LocationService} from '../services/location.service';

import * as GolfClubActions from '../../golf-club/data-access/actions/golf-club.actions';
import { Store} from '@ngrx/store';
import {StorageService} from '../../ionic-storage/storage.service';
import {selectCurrentLocation} from './location.selectors';
import {selectAccessToken} from '../../auth/data-access/auth.selectors';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {updateAProductItem} from '../../product/data-access/product.actions';

@Injectable()
export class LocationEffects {

  findSavedGolfClub$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.findSavedLocation),
    delay(10),
    exhaustMap(() => from(this.storageService.get('LOCATION'))),
    concatLatestFrom(() => this.store.select(selectCurrentLocation)),
    filter(([location]) => !!location),
    map(([location,]) => LocationActions.setCurrentLocation({location}))
  ));

  golfClubChange$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.setCurrentGolfClub),
    filter(action => !!action.golfClub),
    map(action => LocationActions.loadLocations({golfClub: action.golfClub}))
  ));

  loadLocations$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.loadLocations),
    debounceTime(500),
    concatMap(action => this.locationService.getAllByClub(action.golfClub.id).pipe(
      map(locations => locations.filter(location => location.type === 'FB')),
      map(locations => LocationActions.loadLocationsSuccess({data: locations, total: locations.length})),
      catchError(error => of(LocationActions.loadLocationsFailure({error})))))
  ));

  setCurrentLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    tap((action) => this.storageService.set('LOCATION', action.location))
  ), {dispatch: false});

  loadLocationSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.loadLocationsSuccess),
    concatLatestFrom(() => this.store.select(selectCurrentLocation)),
    filter(([, currentLocation]) => !currentLocation),
    map(() => LocationActions.findSavedLocation())
  ));

  onCurrentLocationChange$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    concatLatestFrom(() => this.store.select(selectAccessToken)),
    switchMap(([action, accessToken]) => this.rxStompService.watch(`/queue/events/stores/${action.location.id}/products`, {
        Authorization: `Bearer ${accessToken}`
      }).pipe(
      map((message: Message) => JSON.parse(message.body))
    )),
    map(body => updateAProductItem({product: body.object}))
  ));


  constructor(private actions$: Actions,
              private rxStompService: RxStompService,
              private locationService: LocationService,
              private storageService: StorageService,
              private store: Store) {
  }

}
