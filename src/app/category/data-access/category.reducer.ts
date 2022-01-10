import {Action, createReducer, on} from '@ngrx/store';
import {Category} from '../models/category';
import * as CategoryActions from './category.actions';

export const categoryFeatureKey = 'category';

export interface CategoryReducer {
  categories: Category[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  parentCategories: Category[];
  subCategories: Category[];
}

export const initialState: CategoryReducer = {
  status: 'idle',
  categories: [],
  parentCategories: [],
  subCategories: []
};

export const categoryReducer = createReducer(
  initialState,

  on(CategoryActions.loadCategories, state => ({...state, status: 'loading'})),
  on(CategoryActions.loadCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
    parentCategories: action.categories.filter(cate => !cate.parent)
  })),
  on(CategoryActions.loadCategoriesFailure, (state, action) => ({...state, status: 'error'})),
);


