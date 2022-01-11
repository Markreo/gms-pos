import {createAction, props} from '@ngrx/store';
import {Product} from '../models/product';


export const loadProducts = createAction(
  '[Product] Load Products', props<{ slide: number; }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ slide: number; products: Product[]; total: number }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ slide: number; error: any }>()
);

export const buildSlides = createAction(
  '[Product] build Slides'
);


export const slideChange = createAction(
  '[Product] Load Products Failure',
  props<{ slideTo: number }>()
);

