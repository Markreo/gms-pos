import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {catchError, delay, exhaustMap, finalize, map, switchMap, tap} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import {AuthService} from '../services/auth.service';
import {from, of} from 'rxjs';
import {AlertController, LoadingController} from '@ionic/angular';
import {StorageService} from '../../ionic-storage/storage.service';
import {Action, Store} from '@ngrx/store';
import {Router} from '@angular/router';

export const TOKEN = 'token';


@Injectable()
export class AuthEffects implements OnInitEffects {

  loadAuth$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadAuth),
    delay(10),
    exhaustMap(action => from(this.storageService.get(TOKEN)).pipe(
      map(token => {
        if (token) {
          return AuthActions.loginSuccess({data: {accessToken: token}});
        } else {
          return AuthActions.logout();
        }
      })
    ))),
  );

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),

    exhaustMap(action => from(this.loadingController.create({
      message: 'Login...'
    })).pipe(
      switchMap(ionLoading => from(ionLoading.present()).pipe(
        switchMap(() => this.authService.login(action.credentials).pipe(
          map(data => AuthActions.loginSuccess({data: {accessToken: data.access_token}})),
          catchError(error => of(AuthActions.loginFailure({error}))),
          finalize(() => ionLoading.dismiss())
        ))
      ))
    ))
  ));


  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(action => {
      this.storageService.set(TOKEN, action.data.accessToken);

    })
  ), {dispatch: false});

  loginFailure$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginFailure),
    exhaustMap(action => from(this.alertController.create({
      header: 'Login Failure',
      message: 'Incorrect username or password.',
      buttons: ['OK']
    })).pipe(
      switchMap(ionAlert => from(ionAlert.present()))
    ))
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.storageService.clear().then(() => {
        this.router.navigate(['/login']);
      });
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private store: Store,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private storageService: StorageService,
              private authService: AuthService) {
  }

  ngrxOnInitEffects(): Action {
    return AuthActions.loadAuth();
  }

}
