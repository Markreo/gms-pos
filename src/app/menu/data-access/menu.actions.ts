import { createAction, props } from '@ngrx/store';

export const loadMenus = createAction(
  '[Menu] Load Menus'
);

export const loadMenusSuccess = createAction(
  '[Menu] Load Menus Success',
  props<{ data: any }>()
);

export const loadMenusFailure = createAction(
  '[Menu] Load Menus Failure',
  props<{ error: any }>()
);
