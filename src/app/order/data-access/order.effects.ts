import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, exhaustMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as OrderActions from './order.actions';
import {cloneTableSuccess, selectTable} from '../../table/table.actions';
import {TableService} from '../../table/table.service';
import {Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../../golf-club/data-access/selectors/golf-club.selectors';
import {OrderService} from '../services/order.service';
import {ProductService} from '../../product/services/product.service';
import {selectOrder} from './order.selectors';
import {OrderItem} from '../models/order-item';
import {Order} from '../models/order';


@Injectable()
export class OrderEffects {

  selectTable$loading = createEffect(() => this.actions$.pipe(
    ofType(selectTable),
    map(order => OrderActions.loadOrder({}))
  ));

  cloneTableSuccess = createEffect(() => this.actions$.pipe(
    ofType(cloneTableSuccess),
    map(action => OrderActions.setTable({table: action.table}))
  ));

  selectTable$ = createEffect(() => this.actions$.pipe(
    ofType(selectTable),
    concatLatestFrom(() => this.store.select(selectCurrentGolfClub)),
    switchMap(([action, golfClub]) => this.orderService.getOrder(golfClub.id, action.id).pipe(
      map(order => OrderActions.loadOrderSuccess({
        order: order.id ? order : new Order({
          items: [],
          table_map: {id: action.id},
          type: 'FB'
        })
      }))
    )),
    catchError(error => of(OrderActions.loadOrderFailure({error})))
  ));


  addVariant$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.addVariant),
    concatLatestFrom(() => this.store.select(selectOrder)),
    map(([action, order]) => {
      const [index, orderItem] = this.getExistingVariants(order, action.variant);
      if (orderItem) {
        return OrderActions.updateOrderItem({index, item: {...orderItem, quantity: orderItem.quantity + 1}});
      } else {
        return OrderActions.addNewOrderItem({
          item: {
            id: null,
            quantity: 1,
            price: action.variant.sale_price,
            variant: action.variant,
            discount: action.variant.discount ?? 0,
            discount_type: 'PERCENTAGE'
          }
        });
      }
    })
  ));

  $submit = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.submitOrder),
    concatLatestFrom(action => [this.store.select(selectCurrentGolfClub), this.store.select(selectOrder)]),
    exhaustMap(([action, golfClub, order]) => {
      if (order.id) {
        return this.orderService.updateOrder(golfClub.id, order.id, order);
      } else {
        return this.orderService.createOrder(golfClub.id, order);
      }
    }),
    map(order => OrderActions.actionOrderSuccess({order}))
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private orderService: OrderService,
              private productService: ProductService,
              private tableService: TableService,
              private store: Store) {
  }

  getExistingVariants(order, variant): [number, OrderItem] {
    if (!order || !order.items) {
      return null;
    }
    const index = order.items.findIndex(item => item.variant.id === variant.id && !item.id && !item.is_voucher && !item.guest);
    return [index, order.items[index]];
  }

}