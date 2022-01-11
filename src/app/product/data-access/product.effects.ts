import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';

import * as ProductActions from './product.actions';
import * as LocationActions from '../../location/data-access/location.actions';
import {Store} from '@ngrx/store';
import {selectProductFilter} from './product.selectors';
import {ProductService} from '../services/product.service';
import {selectCurrentLocation} from '../../location/data-access/location.selectors';


@Injectable()
export class ProductEffects {
  setCurrentLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => ProductActions.loadProducts({slide: 0}))
  ));

  loadProducts = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    concatLatestFrom(() => [this.store.select(selectCurrentLocation), this.store.select(selectProductFilter)]),
    switchMap(([action, location, filter]) => this.productService.getAllWithFilter(location.id, filter).pipe(
      map(resp => ProductActions.loadProductsSuccess({slide: action.slide, products: resp.data, total: resp.total}))
    ))
  ));


  constructor(private actions$: Actions,
              private store: Store,
              private productService: ProductService) {
  }

}
