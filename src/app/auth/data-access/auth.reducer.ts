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
  status: 'logged' | 'logout' | 'verifying';
}

export const initialState: AuthState = {
  username: null,
  password: null,
  accessToken: null,
  refreshToken: null,
  roles: [],
  tokenType: null,
  status: 'logout',
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({...state, status: 'verifying'})),
  on(AuthActions.loginSuccess, (state, action) => ({...state, accessToken: action.data.accessToken, status: 'logged'})),
  on(AuthActions.loginFailure, state => ({...state, status: 'logout'})),
  on(AuthActions.logout, () => initialState),
);
