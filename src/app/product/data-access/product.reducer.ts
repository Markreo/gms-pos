import {createReducer, on} from '@ngrx/store';
import * as ProductActions from './product.actions';
import {Product} from '../models/product';
import {updateListProduct} from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  status: 'idle' | 'loading' | 'loading-slide' | 'loaded' | 'error';
  slides: {
    status: 'idle' | 'loading' | 'loaded' | 'error';
    products: Product[];
  }[];
  filter: {
    search: string;
    max: number;
  };
}

export const initialState: ProductState = {
  slides: [],
  status: 'loading',
  filter: {
    search: '',
    max: 20
  }
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.updateListProduct, (state) => ({
    ...state,
    status: 'loading',
    slides: []
  })),
  on(ProductActions.updateListProductSuccess, (state, action) => ({
    ...state,
    status: 'loaded',
    slides: buildNewSlide(state, action),
    currentSlide: 0
  })),
  on(ProductActions.updateForSlide, (state, action) => ({
    ...state,
    status: 'loading-slide',
    slides: state.slides.map((slide, index) => {
      if (index === action.slide) {
        return {...slide, status: 'loading'};
      }
      return slide;
    })
  })),
  on(ProductActions.updateForSlideSuccess, (state, action) => ({
    ...state,
    status: 'loading-slide',
    slides: state.slides.map((slide, index) => {
      if (index === action.slide -1 || index === action.slide + 1) {
        return {...slide, status: 'loading', products: []};
      }
      if (index === action.slide) {
        return {...slide, status: 'loaded', products: action.data};
      }
      return slide;
    })
  })),
  on(ProductActions.loadProductsFailure, (state) => ({...state, status: 'error'})),
  on(ProductActions.triggerUpdateSearch, (state, action) => ({...state, filter: {...state.filter, search: action.search}}))
);


export const buildNewSlide = (state: ProductState, action: { data: Product[]; total: number }) => {
  const page = Math.ceil(action.total / state.filter.max);
  const slide = Array(page).fill({status: 'idle', products: []});
  slide[0] = {status: 'loaded', products: action.data};
  if (page > 1) {
    slide[1] = {status: 'loading', products: action.data};
  }
  return slide;
};
