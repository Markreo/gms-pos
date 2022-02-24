import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {from, of} from 'rxjs';

import * as OrderActions from './order.actions';
import {cloneTableSuccess, selectTable} from '../../table/table.actions';
import {TableService} from '../../table/table.service';
import {Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../../golf-club/data-access/selectors/golf-club.selectors';
import {OrderService} from '../services/order.service';
import {ProductService} from '../../product/services/product.service';
import {selectOrder} from './order.selectors';
import {OrderItem} from '../models/order-item';
import {LoadingController, ToastController} from '@ionic/angular';
import {initOrderFunction} from './init-order.function';
import {toSubmitOrderFunction} from './to-submit-order.function';
import {setGuest} from '../../guest/data-access/guest.actions';


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
        order: order.id ? order : initOrderFunction(action)
      })),
      catchError(error => of(OrderActions.loadOrderFailure({error}))),
    )),
  ));


  addVariant$ = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.addVariant),
    concatLatestFrom(() => this.store.select(selectOrder)),
    map(([action, order]) => {
      const [index, orderItem] = this.getExistingVariants(order, action.variant);
      if (orderItem) {
        return OrderActions.updateOrderItemSuccess({index, item: {...orderItem, quantity: orderItem.quantity + 1}});
      } else {
        return OrderActions.addNewOrderItem({
          item: new OrderItem({
            id: null,
            quantity: 1,
            price: action.variant.sale_price,
            variant: action.variant,
            discount: action.variant.discount ?? 0,
            discount_type: 'PERCENTAGE'
          })
        });
      }
    })
  ));

  $checkout = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.checkoutOrder),
    concatLatestFrom(() => this.store.select(selectOrder).pipe(map(order => toSubmitOrderFunction(order)))),
    exhaustMap(([action, order]) => from(this.loadingController.create({
        message: 'Please wait...'
      })).pipe(
        switchMap(ionLoading => from(ionLoading.present()).pipe(
          switchMap(() => this.orderService.checkoutOrder(order.id, order).pipe(
            tap(() => {
              this.toastController.create({
                message: 'Checkout success!',
                duration: 1000,
                color: 'primary'
              }).then(toast => toast.present());
            }),
            finalize(() => {
              ionLoading.dismiss().then(() => {
              });
            }),
            catchError(error => {
              this.store.dispatch(OrderActions.actionOrderFailure({error}));
              return of(null);
            })
          ))
        )),
        filter(r => !!r),
        map(updatedOrder => OrderActions.loadOrderSuccess({order: initOrderFunction({id: order.table_map})})),
      ),
    ),
  ));

  $submit = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.submitOrder),
    concatLatestFrom(() => this.store.select(selectOrder).pipe(map(order => toSubmitOrderFunction(order)), tap(console.log))),
    exhaustMap(([action, order]) => from(this.loadingController.create({
      message: order.id ? 'Update...' : 'Submit...'
    })).pipe(
      switchMap(ionLoading => from(ionLoading.present()).pipe(
        concatLatestFrom(() => this.store.select(selectCurrentGolfClub)),
        exhaustMap(([, golfClub]) => {
          if (order.id) {
            return this.orderService.updateOrder(golfClub.id, order.id, order).pipe(
              catchError(error => {
                this.store.dispatch(OrderActions.actionOrderFailure({error}));
                return of(null);
              }),
              finalize(() => {
                ionLoading.dismiss().then(r => {
                });
              })
            );
          } else {
            return this.orderService.createOrder(golfClub.id, order).pipe(
              catchError(error => {
                this.store.dispatch(OrderActions.actionOrderFailure({error}));
                return of(null);
              }),
              finalize(() => {
                ionLoading.dismiss().then(r => {
                });
              })
            );
          }
        }),
        filter(r => !!r),
        tap(() => {
          this.toastController.create({
            message: (order.id ? 'Update' : 'Submit') + ' success!',
            duration: 1500,
            color: 'primary'
          }).then(toast => toast.present());
        }),
        map(updatedOrder => OrderActions.actionOrderSuccess({order: updatedOrder}))
      )),
    )),
  ));

  actionError = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.actionOrderFailure),
    exhaustMap((action) => this.toastController.create({
      header: 'Error!',
      message: action.error.error.message,
      duration: 2500,
      color: 'danger'
    })),
    tap(toast => {
      toast.present().then(a => {
      });
    })
  ), {dispatch: false});


  selectGuest = createEffect(() => this.actions$.pipe(
    ofType(setGuest),
    map(action => OrderActions.setGuestOfOrder({guest: action.guest}))
  ));

  constructor(private actions$: Actions,
              private orderService: OrderService,
              private productService: ProductService,
              private tableService: TableService,
              private loadingController: LoadingController,
              private toastController: ToastController,
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
