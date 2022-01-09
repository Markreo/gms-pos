import { Action, createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';

export const homeFeatureKey = 'home';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(HomeActions.loadHomes, state => state),
  on(HomeActions.loadHomesSuccess, (state, action) => state),
  on(HomeActions.loadHomesFailure, (state, action) => state),

);
