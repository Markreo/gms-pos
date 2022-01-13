import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, delay, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProductActions from './product.actions';
import * as LocationActions from '../../location/data-access/location.actions';
import {Store} from '@ngrx/store';
import {selectProductFilter} from './product.selectors';
import {ProductService} from '../services/product.service';
import {selectCurrentLocation} from '../../location/data-access/location.selectors';
import {selectActiveCategory} from '../../category/data-access/category.selectors';
import * as CategoryActions from '../../category/data-access/category.actions';
import {of} from 'rxjs';


@Injectable()
export class ProductEffects {
  setCurrentLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => ProductActions.loadProducts({}))
  ));

  setParentCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.selectParentCategory),
    map(action => ProductActions.loadProducts({}))
  ));

  updateSearch$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateSearch),
    map(action => ProductActions.loadProducts({}))
  ));

  updateCurrentSide$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateCurrentSide),
    map(action => ProductActions.loadProducts({newSlide: action.slide}))
  ));


  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    concatLatestFrom(() => [
      this.store.select(selectCurrentLocation),
      this.store.select(selectProductFilter),
      this.store.select(selectActiveCategory)]), //select menu, select sub-category
    debounceTime(300),
    tap(a => console.log('loadProducts', a)),
    switchMap(([action, location, filter, category]) =>
      this.productService.getAllWithFilter(location.id, filter).pipe(
        map(resp => action.newSlide ? ProductActions.loadProductsSuccessAndUpdate({
          products: resp.data,
          newSlide: action.newSlide
        }) : ProductActions.loadProductsSuccessAndReset({
          products: resp.data,
          total: resp.total
        }))
      )),
    catchError(error => of(ProductActions.loadProductsFailure({error})))
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private productService: ProductService) {
  }

}
