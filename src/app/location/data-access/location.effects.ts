import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, exhaustMap} from 'rxjs/operators';
import {Observable, EMPTY, of} from 'rxjs';

import * as LocationActions from './location.actions';
import {LocationService} from '../services/location.service';

import * as GolfClubActions from '../../golf-club/data-access/actions/golf-club.actions';

@Injectable()
export class LocationEffects {

  golfClubChange$ = createEffect(() => this.actions$.pipe(
    ofType(GolfClubActions.setCurrentGolfClub),
    map(action => LocationActions.loadLocations({golfClub: action.golfClub}))
  ));

  loadLocations$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.loadLocations),
    concatMap(action => this.locationService.getAllByClub(action.golfClub.id).pipe(
        map(locations => LocationActions.loadLocationsSuccess({data: locations, total: locations.length})),
        catchError(error => of(LocationActions.loadLocationsFailure({error})))))
  ));


  constructor(private actions$: Actions, private locationService: LocationService) {
  }

}
