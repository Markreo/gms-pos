import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSubCategory from './sub-category.reducer';

export const selectSubCategoryState = createFeatureSelector<fromSubCategory.SubCategoryState>(
  fromSubCategory.subCategoryFeatureKey
);


export const selectSubCategories = createSelector(selectSubCategoryState, state => state.subCategories);
export const selectActiveSubCategory = createSelector(selectSubCategoryState, state => state.activeSubCategory);
