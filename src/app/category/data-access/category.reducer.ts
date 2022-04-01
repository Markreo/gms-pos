import {Action, createReducer, on} from '@ngrx/store';
import {Category} from '../models/category';
import * as CategoryActions from './category.actions';
import {Menu} from '../models/menu';

export const categoryFeatureKey = 'category';

export interface CategoryReducer {
  categories: Category[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  parentCategories: Category[];
  menus: Menu[];
  activeCategory: Category;
  activeMenu: Menu;
}

export const initialState: CategoryReducer = {
  status: 'loading',
  categories: [],
  parentCategories: [],
  menus: [],
  activeCategory: null,
  activeMenu: null
};

export const categoryReducer = createReducer(
  initialState,

  on(CategoryActions.loadCategories, state => ({...state, status: 'loading'})),
  on(CategoryActions.loadMenus, state => ({...state, status: 'loading'})),
  on(CategoryActions.loadCategoriesSuccess, (state, action) => ({
    ...state,
    status: 'loaded',
    categories: action.categories,
    parentCategories: action.categories.filter(cate => !cate.parent)
  })),
  on(CategoryActions.loadMenusSuccess, (state, action) => ({
    ...state,
    status: 'loaded',
    menus: action.menus
  })),
  on(CategoryActions.loadCategoriesFailure, (state, action) => ({...state, status: 'error'})),
  on(CategoryActions.selectParentCategory, (state, action) => ({
    ...state,
    activeCategory: action.category,
  })),
  on(CategoryActions.selectMenu, (state, action) => ({
    ...state,
    activeMenu: action.menu,
  })),
  on(CategoryActions.resetMenu, state => initialState)

);


