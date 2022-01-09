import {createAction, props} from '@ngrx/store';

export const loadAuth  = createAction('[Auth] Load Auth');

export const login = createAction('[Auth] Login', props<{ credentials: { username; password } }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ data: { accessToken } }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
