import {createReducer, on} from '@ngrx/store';
import * as SubCategoryActions from './sub-category.actions';
import {Category} from '../../category/models/category';

export const subCategoryFeatureKey = 'subCategory';

export interface SubCategoryState {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  subCategories: Category[];
  activeSubCategory: Category;
}

export const initialState: SubCategoryState = {
  status: 'idle',
  subCategories: [],
  activeSubCategory: null
};

export const subCategoryReducer = createReducer(
  initialState,

  on(SubCategoryActions.loadSubCategories, state => state),
  on(SubCategoryActions.loadSubCategoriesSuccess, (state, action) => ({
    ...state,
    status: 'loaded',
    subCategories: action.subCategories,
    activeSubCategory: isActiveCategoryExistingInList(state.activeSubCategory, action.subCategories) ? state.activeSubCategory : null
  })),
  on(SubCategoryActions.loadSubCategoriesFailure, (state, action) => state),
  on(SubCategoryActions.activeSubCategory, (state, action) => ({
    ...state,
    activeSubCategory: action.subCategory
  })),
);


export const isActiveCategoryExistingInList = (category: Category, list: Category[]) => {
  if (!category) {
    return false;
  }
  return list.some(item => item.id === category.id);
};
