import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, delay, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProductActions from './product.actions';
import * as LocationActions from '../../location/data-access/location.actions';
import {Action, Store} from '@ngrx/store';
import {selectProductFilter} from './product.selectors';
import {ProductService} from '../services/product.service';
import {selectCurrentLocation} from '../../location/data-access/location.selectors';
import {selectActiveCategory} from '../../category/data-access/category.selectors';
import * as CategoryActions from '../../category/data-access/category.actions';
import {of, pipe} from 'rxjs';
import {TypedAction} from '@ngrx/store/src/models';
import {updateForSlideSuccess, updateListProductSuccess} from './product.actions';
import {selectActiveSubCategory} from "../../sub-category/data-access/sub-category.selectors";
import {activeSubCategory} from "../../sub-category/data-access/sub-category.actions";


@Injectable()
export class ProductEffects {
  setCurrentLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => ProductActions.updateListProduct())
  ));

  setParentCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.selectParentCategory),
    map(action => ProductActions.updateListProduct())
  ));

  setSubCategory = createEffect(() => this.actions$.pipe(
    ofType(activeSubCategory),
    map(action => ProductActions.updateListProduct())
  ));

  updateSearch$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.triggerUpdateSearch),
    debounceTime(300),
    delay(10),
    map(action => ProductActions.updateListProduct())
  ));


  updateListProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateListProduct),
    this.updateProductPipe(updateListProductSuccess)
  ));


  updateForSlide$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateForSlide),
    this.updateProductPipe(updateForSlideSuccess)
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private productService: ProductService) {
  }

  updateProductPipe(returnAction) {
    return pipe(
      concatLatestFrom(() => [
        this.store.select(selectCurrentLocation),
        this.store.select(selectProductFilter),
        this.store.select(selectActiveCategory),
        this.store.select(selectActiveSubCategory)
      ]), //select menu, select sub-category
      debounceTime(300),
      switchMap(([action, location, filter, category, subCategory]) => {
          // if  menu
          // if category -> menu by category
          // menu only
          // if sub-category -> filter sub-category
          // if category -> filter category
          // get all
          const slide = (action as any)?.slide;
          const start = slide ? slide * filter.max : 0;
          return this.productService.getAllWithFilter(location.id, {
            ...filter,
            start,
            category: subCategory ? subCategory.id : category?.id
          }).pipe(map(resp => returnAction({...resp, slide: (action as any)?.slide})));
        }
      ),
      catchError(error => of(ProductActions.loadProductsFailure({error}))),
    );
  }
}
