import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProduct from './product.reducer';

export const selectProductState = createFeatureSelector<fromProduct.ProductState>(
  fromProduct.productFeatureKey
);


export const selectSlide = createSelector(selectProductState, state => state?.slides);
export const selectProductFilter = createSelector(selectProductState, state => state.filter);
