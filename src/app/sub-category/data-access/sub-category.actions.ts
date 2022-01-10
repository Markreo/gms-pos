import {createAction, props} from '@ngrx/store';
import {Category} from '../../category/models/category';

export const loadSubCategories = createAction(
  '[SubCategory] Load Sub-Categories'
);

export const loadSubCategoriesSuccess = createAction(
  '[SubCategory] Load Sub-Categories Success',
  props<{ subCategories: Category[] }>()
);

export const loadSubCategoriesFailure = createAction(
  '[SubCategory] oad Sub-Categories Failure',
  props<{ error: any }>()
);

export const activeSubCategory = createAction(
  '[SubCategory] Active Sub-Category',
  props<{ subCategory: Category }>()
);
