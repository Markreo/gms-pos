import {createReducer, on} from '@ngrx/store';
import * as ProductActions from './product.actions';
import {Product} from '../models/product';

export const productFeatureKey = 'product';

export interface ProductState {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  slides: {
    status: 'idle' | 'loading' | 'loaded' | 'error';
    products: Product[];
  }[];
  filter: {
    search: string;
    start: number;
    max: number;
  };
}

export const initialState: ProductState = {
  slides: [],
  status: 'idle',
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
    status: action.newSlide ? 'loaded' : 'loading',
    slides: state.slides.map((slide, index) => {
      if (index === action.newSlide ?? 0) {
        return {...slide, status: slide.status !== 'loaded' ? 'loading' : 'loaded'};
      } else {
        return slide;
      }
    })
  })),
  on(ProductActions.loadProductsSuccessAndReset, (state, action) => ({
    ...state,
    status: 'loaded',
    slides: buildNewSlide(state, action),
    currentSlide: 0
  })),
  on(ProductActions.loadProductsSuccessAndUpdate, (state, action) => ({
    ...state,
    status: 'loaded',
    slides: updateSlide(action.newSlide, state.slides, action.products),
    currentSlide: action.newSlide
  })),
  on(ProductActions.loadProductsFailure, (state) => ({...state, status: 'error'})),
);


export const buildNewSlide = (state: ProductState, action: { products: Product[]; total: number }) => {
  const page = Math.ceil(action.total / state.filter.max);
  const slide = Array(page).fill({status: 'idle', products: []});
  slide[0] = {status: 'loaded', products: action.products};
  if (page > 1) {
    slide[1] = {status: 'loading', products: action.products};
  }
  return slide;
};

export const updateSlide = (newSlideIndex, currentSlides, newProducts) => currentSlides.map((slide, index) => {
  if (index === newSlideIndex) {
    return {...slide, status: 'loaded', products: newProducts};
  } else if (index === newSlideIndex + 1 && slide.status === 'idle') {
    return {...slide, status: 'loading'};
  } else {
    return slide;
  }
});
