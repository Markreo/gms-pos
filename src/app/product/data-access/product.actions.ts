import {createAction, props} from '@ngrx/store';
import {Product} from '../models/product';


export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ newSlide?: number }>()
);

export const loadProductsSuccessAndReset = createAction(
  '[Product] Load Products success then build new slide',
  props<{ products: Product[]; total: number }>()
);

export const loadProductsSuccessAndUpdate = createAction(
  '[Product] Load Products success then update slide',
  props<{ products: Product[]; newSlide }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{  error: any }>()
);

export const updateSearch = createAction(
  '[Product] update search',
  props<{ search: string }>()
);

export const updateCurrentSide = createAction(
  '[Product] update current slide',
  props<{ slide: number }>()
);
