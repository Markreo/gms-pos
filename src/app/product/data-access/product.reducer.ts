import {createReducer, on} from '@ngrx/store';
import * as ProductActions from './product.actions';
import {Product} from '../models/product';

export const productFeatureKey = 'product';

export interface ProductState {
  slides: {
    status: 'idle' | 'loading' | 'loaded' | 'error';
    products: Product[];
  }[];
  currentSlide: number;
  filter: {
    search: string;
    start: number;
    max: number;
  };
}

export const initialState: ProductState = {
  slides: [],
  currentSlide: 0,
  filter: {
    search: '',
    start: 0,
    max: 20
  }
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state, action) => ({
    ...state,
    filter: {
      ...state.filter,
      start: action.slide * state.filter.max
    }
  })),
  on(ProductActions.loadProductsSuccess, (state, action) => {

    return {
      ...state,
      slides: state.slides.length === 0 || action.slide > state.slides.length - 1 ? buildNewSlide(state, action) : updateSlide(state, action)
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action) => ({...state, status: 'error'})),
);


export const buildNewSlide = (state: ProductState, action) => {
  const page = Math.ceil(action.total / state.filter.max);
  const slide = Array(page).fill({status: 'loading', products: []});
  slide[action.slide] = {status: 'loaded', products: action.products};
  return slide;
};

export const updateSlide = (state: ProductState, action) => state.slides.map((slide, index) => {
  if (index === action.slide) {
    return {...slide, status: 'loaded', products: action.products};
  } else {
    return slide;
  }
});
