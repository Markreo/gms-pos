import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, concatMap, debounceTime, delay, exhaustMap, filter, map, tap} from 'rxjs/operators';
import {from, of} from 'rxjs';

import * as LocationActions from './location.actions';
import {LocationService} from '../services/location.service';

import * as GolfClubActions from '../../golf-club/data-access/actions/golf-club.actions';
import {Action, Store} from '@ngrx/store';
import {StorageService} from '../../ionic-storage/storage.service';
import {selectCurrentLocation} from './location.selectors';

@Injectable()
export class LocationEffects  {

  findSavedGolfClub$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.findSavedLocation),
    delay(10),
    exhaustMap(() => from(this.storageService.get('LOCATION')).pipe(tap(console.log))),
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
    tap(action => console.log('loadLocations$', action)),
    debounceTime(500),
    concatMap(action => this.locationService.getAllByClub(action.golfClub.id).pipe(
      map(locations => LocationActions.loadLocationsSuccess({data: locations, total: locations.length})),
      catchError(error => of(LocationActions.loadLocationsFailure({error})))))
  ));

  setCurrentLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    tap(() => console.log('save location')),
    concatLatestFrom(() => this.store.select(selectCurrentLocation)),
    // filter(([action, currentGolfClub]) => !!action.golfClub && action.golfClub.id !== currentGolfClub?.id),
    tap(([action,]) => this.storageService.set('LOCATION', action.location))
  ), {dispatch: false});

  loadLocationSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.loadLocationsSuccess),
    concatLatestFrom(() => this.store.select(selectCurrentLocation)),
    filter(([, currentLocation]) => !currentLocation),
    map(() => LocationActions.findSavedLocation())
  ))


  constructor(private actions$: Actions,
              private locationService: LocationService,
              private storageService: StorageService,
              private store: Store) {
  }

}
