import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCategory from './category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.CategoryReducer>(
  fromCategory.categoryFeatureKey
);

export const selectParentCategories = createSelector(selectCategoryState, state => state.parentCategories);
