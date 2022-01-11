import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCategory from './category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.CategoryReducer>(
  fromCategory.categoryFeatureKey
);

export const selectCategories = createSelector(selectCategoryState, state => state.categories);
export const selectParentCategories = createSelector(selectCategoryState, state => state.parentCategories);
export const selectActiveCategory = createSelector(selectCategoryState, state => state.activeCategory);
export const selectStatusCategory = createSelector(selectCategoryState, state => state.status);
