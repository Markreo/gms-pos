import {createAction, props} from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ credentials: { username; password } }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ data: any }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
