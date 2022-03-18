import {createAction, props} from '@ngrx/store';
import {Location} from '../../location/data-access/location';
import {Category} from '../models/category';
import {Menu} from '../models/menu';

export const loadCategories = createAction(
  '[Category] loadCategories', props<{ location: Location }>()
);
export const loadCategoriesSuccess = createAction('[Category] loadCategoriesSuccess', props<{ categories: Category[] }>());
export const loadCategoriesFailure = createAction('[Category] loadCategoriesFailure', props<{ error: any }>());
export const selectParentCategory = createAction('[Category] select parent category', props<{ category: Category }>());

export const loadMenus = createAction('[Menu] load menu', props<{location: Location}>());
export const loadMenusSuccess = createAction('[Menu] load menu success', props<{menus: Menu[]}>());
export const selectMenu = createAction(
  '[Menu] selectMenu',
  props<{ menu: Menu }>()
);
