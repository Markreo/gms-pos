import {createAction, props} from '@ngrx/store';
import {Product} from '../models/product';

export const initProduct = createAction('[Product] init product');
export const updateListProduct = createAction('[Product] update product');
export const updateForSlide = createAction('[Product] update slide', props<{ slide: number }>());

export const updateListProductSuccess = createAction('[Product] update product success', props<{ total: number; data: Product[] }>());
export const updateForSlideSuccess = createAction('[Product] update slide success', props<{slide: number;data: Product[] }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: any }>());


export const triggerUpdateSearch = createAction(
  '[Product] update search',
  props<{ search: string }>()
);

export const updateAProductItem = createAction('[Product] update a product item', props<{product: Product}>());
