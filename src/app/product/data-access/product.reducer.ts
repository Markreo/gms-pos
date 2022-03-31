import {createReducer, on} from '@ngrx/store';
import * as ProductActions from './product.actions';
import {Product} from '../models/product';

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
  oldSlideIndex: number;
}

export const initialState: ProductState = {
  slides: [],
  status: 'loading',
  filter: {
    search: '',
    max: 16
  },
  oldSlideIndex: 0
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
    oldSlideIndex: 0
  })),
  on(ProductActions.updateForSlide, (state, action) => ({
    ...state,
    status: 'loading-slide',
    slides: state.slides.map((slide, index) => {
      if (index === state.oldSlideIndex) {
        return {...slide, status: 'loading', products: []};
      }
      if (index === action.slide) {
        return {...slide, status: 'loading'};
      }
      return slide;
    }),
    oldSlideIndex: action.slide
  })),
  on(ProductActions.updateForSlideSuccess, (state, action) => ({
    ...state,
    status: 'loading-slide',
    slides: state.slides.map((slide, index) => {
      if (index === action.slide - 1 || index === action.slide + 1) {
        return {...slide, status: 'loading', products: []};
      }
      if (index === action.slide) {
        return {...slide, status: 'loaded', products: action.data};
      }
      return slide;
    })
  })),
  on(ProductActions.loadProductsFailure, (state) => ({...state, status: 'error'})),
  on(ProductActions.triggerUpdateSearch, (state, action) => ({
    ...state,
    filter: {...state.filter, search: action.search}
  })),
  on(ProductActions.updateAProductItem, (state, action) => ({
    ...state,
    slides: state.slides.map(slide => {
      if (slide.status === 'loaded') {
        return {
          ...slide, products: slide.products.map(product => {
            if (product.id === action.product.id) {
              return action.product;
            } else {
              return product;
            }
          })
        };
      } else {
        return slide;
      }
    })
  }))
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
