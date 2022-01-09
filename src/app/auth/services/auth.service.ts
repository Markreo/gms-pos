import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {buildUrl} from '../../_helpers/functions';
import {Store} from '@ngrx/store';

import * as AuthActions from '../data-access/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private store: Store) {
  }


  login(loginData: { username: string; password: string }) {
    return this.http.post<any>(buildUrl('auth/token'), {
      username: loginData.username,
      password: loginData.password,
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
