import { Action, createReducer, on } from '@ngrx/store';
import * as MenuActions from './menu.actions';

export const menuFeatureKey = 'menu';

export interface State {

}

export const initialState: State = {

};

export const menuReducer = createReducer(
  initialState,

  on(MenuActions.loadMenus, state => state),
  on(MenuActions.loadMenusSuccess, (state, action) => state),
  on(MenuActions.loadMenusFailure, (state, action) => state),

);
