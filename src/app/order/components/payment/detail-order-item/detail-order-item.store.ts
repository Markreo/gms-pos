import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {OrderItem} from '../../../models/order-item';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, finalize, map, switchMap, tap} from 'rxjs/operators';
import {ModalController, ToastController} from '@ionic/angular';
import {updateOrderItemSuccess} from '../../../data-access/order.actions';
import {Store} from '@ngrx/store';
import {OrderService} from '../../../services/order.service';
import {selectCurrentGolfClub} from '../../../../golf-club/data-access/selectors/golf-club.selectors';
import {GuestService} from '../../../../guest/services/guest.service';
import {concatLatestFrom} from '@ngrx/effects';

export interface DetailOrderItemState {
  index: number;
  item: OrderItem;
  loadingVoucher: boolean;
  loadingBagtag: boolean;
}

const initialState: DetailOrderItemState = {
  index: -1,
  item: null,
  loadingVoucher: false,
  loadingBagtag: false
};

@Injectable()
export class DetailOrderItemStore extends ComponentStore<DetailOrderItemState> {
  readonly selectItem$ = this.select(state => state.item);
  readonly selectIndex$ = this.select(state => state.index);
  readonly loadingVoucher$ = this.select(state => state.loadingVoucher);
  readonly loadingBagtag$ = this.select(state => state.loadingBagtag);


  updateIndex = this.updater((state, index: number) => ({...state, index}));
  setItem = this.updater((state, item: OrderItem) => ({...state, item}));


  callApiApplyVoucher = this.effect((item$: Observable<OrderItem>) => item$.pipe(
    tap(_ => this.setLoadingVoucher(true)),
    switchMap(item => this.orderService.applyVoucherOrderItem(item.id).pipe(
      tap({
        next: order => this.store.dispatch(updateOrderItemSuccess({
          index: 1, item: {
            ...item, is_voucher: true
          }
        })),
        error: (e) => {
          this.toastController.create({
            message: 'Đã xảy ra lỗi khi apply voucher',
            color: 'danger'
          }).then(toast => toast.present());
        }
      }),
      finalize(() => {
        this.setLoadingVoucher(false);
      })
    ))
  ));

  applyBagtag = this.effect((bagtag$: Observable<string>) => bagtag$.pipe(
    concatLatestFrom(() => [this.store.select(selectCurrentGolfClub), this.selectIndex$, this.selectItem$]),
    switchMap(([bagtag, golfClub, index, orderItem]) => {
      this.setLoadingBagtag(true);
      return this.guestService.getAllWithFilter(golfClub.id, {search: bagtag}).pipe(
        map(({data}) => data[0]),
        switchMap(guest => {
          if (guest) {
            if (orderItem.id) {
              return this.orderService.applyGuestOrderItem(orderItem.id, guest.id).pipe(
                tap(newOrderItem => {
                  this.store.dispatch(updateOrderItemSuccess({index, item: newOrderItem}));
                }),
                finalize(() => {
                  this.setLoadingBagtag(false);
                })
              );
            } else {
              this.setLoadingBagtag(false);
              this.store.dispatch(updateOrderItemSuccess({index, item: {...orderItem, guest}}));
              return of(EMPTY);
            }
          } else {
            throw new Error('Guest not found');
          }
        }),
      );
    }),
    catchError((error) => {
      this.setLoadingBagtag(false);
      this.toastController.create({message: 'Guest not found', color: 'danger'}).then(toast => toast.present());
      console.error(error);
      throw new Error('Guest not found');
    })));

  removeBagtag = this.effect(trigger$ => trigger$.pipe(
    concatLatestFrom(() => [this.selectIndex$, this.selectItem$]),
    switchMap(([, index, item]) => {
      if (item.id) {
        this.setLoadingBagtag(true);
        return this.orderService.applyGuestOrderItem(item.id, null).pipe(
          tap(() => {
            this.store.dispatch(updateOrderItemSuccess({index, item: {...item, guest: null}}));
          }),
          finalize(() => {
            this.setLoadingBagtag(false);
          })
        );
      } else {
        this.store.dispatch(updateOrderItemSuccess({index, item: {...item, guest: null}}));
        return of(EMPTY);
      }
    })
  ));


  private readonly setLoadingVoucher = this.updater((state, loading: boolean) => ({...state, loadingVoucher: loading}));
  private readonly setLoadingBagtag = this.updater((state, loading: boolean) => ({...state, loadingBagtag: loading}));


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


  constructor(private modalController: ModalController,
              private store: Store,
              private orderService: OrderService,
              private guestService: GuestService,
              private toastController: ToastController) {
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
        item: {...item, discount: item.discount, discount_type},
        index
      }));
    }
  }

  updateDescription(index, item, value) {
    if (item.id) {
      this.callApiUpdateDescription({index, item, description: value});
    } else {
      this.store.dispatch(updateOrderItemSuccess({index, item: {...item, description: value}}));
    }
  }

}
