import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
  tokenType: string;
}

export const initialState: AuthState = {
  username: null,
  password: null,
  accessToken: null,
  refreshToken: null,
  roles: [],
  tokenType: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, state => state),
  on(AuthActions.loginSuccess, (state, action) => state),
  on(AuthActions.loginFailure, (state, action) => state),
);
