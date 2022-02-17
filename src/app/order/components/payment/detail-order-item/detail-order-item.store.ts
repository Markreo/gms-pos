import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {OrderItem} from '../../../models/order-item';
import {EMPTY, Observable} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {updateOrderItemSuccess} from '../../../data-access/order.actions';
import {Store} from '@ngrx/store';
import {OrderService} from '../../../services/order.service';

export interface DetailOrderItemState {
  item: OrderItem;
}

const initialState: DetailOrderItemState = {
  item: null
};

@Injectable()
export class DetailOrderItemStore extends ComponentStore<DetailOrderItemState> {
  readonly selectItem$ = this.select(state => state.item);

  callApiApplyVoucher = this.effect((item$: Observable<OrderItem>) => item$.pipe(
    switchMap(item => this.orderService.applyVoucherOrderItem(item.id).pipe(
      tap({
        next: order => this.store.dispatch(updateOrderItemSuccess({index: 1, item: {
            ...item, is_voucher: true
          } })),
        error: (e) => {
          console.log('error');
        }
      })
    ))
  ));


  private readonly setItem = this.updater((state, item: OrderItem) => ({...state, item}));

  private callApiApplyDiscount = this.effect((discount$: Observable<{ index; item; discount; discount_type }>) => discount$.pipe(
    switchMap(({index, item, discount, discount_type}) =>
      this.orderService.applyDiscountOrderItem(item.id, {discount, discount_type}).pipe(
        //👇 Act on the result within inner pipe.
        tap({
          next: (movie) => this.store.dispatch(updateOrderItemSuccess({
            item: {...item, discount: Number(discount) || 0, discount_type},
            index
          })),
          error: (e) => {
            console.log('error');
          },
        }),
        // 👇 Handle potential error within inner pipe.
        catchError(() => EMPTY),
      ))
  ));

  private callApiUpdateDescription = this.effect((description$: Observable<{ index; item; description }>) => description$.pipe(
    switchMap(({index, item, description}) =>
      this.orderService.updateDescription(item.id, {description}).pipe(
        //👇 Act on the result within inner pipe.
        tap({
          next: (movie) => this.store.dispatch(updateOrderItemSuccess({
            item: {...item, description},
            index
          })),
          error: (e) => {
            console.log('error');
          },
        }),
        // 👇 Handle potential error within inner pipe.
        catchError(() => EMPTY),
      ))
  ));


  constructor(private modalController: ModalController, private store: Store, private orderService: OrderService) {
    super(initialState);
  }


  applyDiscount(index, item: OrderItem, discount) {
    if (item.id) {
      this.callApiApplyDiscount({index, item, discount, discount_type: item.discount_type});
    } else {
      this.store.dispatch(updateOrderItemSuccess({
        item: {...item, discount: Number(discount) || 0, discount_type: item.discount_type},
        index
      }));
    }
  }

  applyDiscountType(index, item: OrderItem, discount_type) {
    if (item.id) {
      this.callApiApplyDiscount({index, item, discount: item.discount, discount_type});
    } else {
      this.store.dispatch(updateOrderItemSuccess({
        item: {...item,  discount: item.discount, discount_type},
        index
      }));
    }
  }

  updateDescription(index, item, value) {
    if (item.id) {
      this.callApiUpdateDescription({index, item, description: value});
    } else {
      this.store.dispatch(updateOrderItemSuccess({index: 0, item: {...item, description: item.description}}));
    }
  }

}
