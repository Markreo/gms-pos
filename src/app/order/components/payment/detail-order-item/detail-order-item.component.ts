import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DetailOrderItemStore} from './detail-order-item.store';
import {OrderItem} from '../../../models/order-item';
import {IonInput, IonTextarea, ModalController, Platform, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {createSelector, Store} from '@ngrx/store';
import {deleteOrderItem, updateOrderItemSuccess} from '../../../data-access/order.actions';
import {Observable} from 'rxjs';
import {selectOrderState} from '../../../data-access/order.selectors';
import {PredefinedColors} from '@ionic/core';

@Component({
  selector: 'app-detail-order-item',
  templateUrl: './detail-order-item.component.html',
  styleUrls: ['./detail-order-item.component.scss'],
  providers: [DetailOrderItemStore],
})
export class DetailOrderItemComponent implements OnInit {
  @Input() index: number;
  @ViewChild('inputQty') inputQtyRef: IonInput;
  @ViewChild('inputPrice') inputPriceRef: IonInput;
  @ViewChild('inputDescription') inputDescriptionRef: IonTextarea;
  @ViewChild('inputDiscountType') inputDiscountTypeRef: IonInput;
  @ViewChild('inputBagtag') inputBagtagRef: IonInput;

  item$: Observable<OrderItem>;
  item;

  focusKey;
  keyBagtag = '';

  loadingVoucher$ = this.detailItemStore.loadingVoucher$;
  loadingBagtag$ = this.detailItemStore.loadingBagtag$;

  constructor(
    private store: Store,
    private detailItemStore: DetailOrderItemStore,
    private modalController: ModalController,
    private toastController: ToastController,
    private translate: TranslateService,
    public platform: Platform) {
  }

  ngOnInit() {
    this.item$ = this.store.select(createSelector(selectOrderState, state => state.order?.items?.find((_, idx) => idx === this.index)));
    this.item$.subscribe(item => {
      this.item = item;
      this.detailItemStore.setItem(item);
    });

    this.detailItemStore.updateIndex(this.index);
  }

  increase(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.focusKey) {
      this.inputQtyRef.setFocus();
    }
    this.store.dispatch(updateOrderItemSuccess({index: this.index, item: {...this.item, quantity: this.item.quantity + 1}}));
  }

  decrease(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputQtyRef.setFocus();
    this.store.dispatch(updateOrderItemSuccess({
      index: this.index,
      item: {...this.item, quantity: this.item.quantity > 1 ? this.item.quantity - 1 : 0}
    }));
  }

  toggleDiscountType(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputDiscountTypeRef.setFocus();
    this.detailItemStore.applyDiscountType(this.index, this.item, this.item.discount_type === 'FIXED' ? 'PERCENTAGE' : 'FIXED');
  }

  markFocus(key) {
    this.focusKey = key;
  }


  markApplyVoucher() {
    if (this.item.id) {
     this.detailItemStore.callApiApplyVoucher(this.item);
    } else {
      this.store.dispatch(updateOrderItemSuccess({index: this.index, item: {...this.item, is_voucher: true}}));
    }

    // if (this.focusKey && this[this.focusKey + 'Ref']) {
    //   this[this.focusKey + 'Ref'].setFocus();
    // }
  }

  applyBagtag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.keyBagtag.trim() === '') {
      return;
    }
    if (this.inputBagtagRef) {
      this.inputBagtagRef.setFocus();
    }
    this.detailItemStore.applyBagtag(this.keyBagtag);
  }

  removeGuest() {
    this.keyBagtag = '';
    this.detailItemStore.removeBagtag();
  }

  applyDiscount(discount) {
    this.detailItemStore.applyDiscount(this.index, this.item, discount);
  }

  async presentToast(message, color: PredefinedColors) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    await toast.present();
  }

  remove() {
    if (this.item.id) {
      this.presentToast('Món ăn đang được chế biến, bạn không thể huỷ ngay lúc này!', 'danger');
    } else {
      this.store.dispatch(deleteOrderItem({index: this.index, item: this.item}));
      this.modalController.dismiss();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get currentLang() {
    return this.translate.currentLang;
  }

  updateDescription(newValue) {
    this.detailItemStore.updateDescription(this.index, this.item, newValue);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
