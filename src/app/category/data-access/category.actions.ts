import {createAction, props} from '@ngrx/store';
import {Location} from '../../location/data-access/location';
import {Category} from '../models/category';

export const loadCategories = createAction(
  '[Category] loadCategories', props<{ location: Location }>()
);

export const loadCategoriesSuccess = createAction(
  '[Category] loadCategoriesSuccess',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Category] loadCategoriesFailure',
  props<{ error: any }>()
);
