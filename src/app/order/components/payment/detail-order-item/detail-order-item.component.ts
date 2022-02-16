import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DetailOrderItemStore} from './detail-order-item.store';
import {OrderItem} from '../../../models/order-item';
import {ModalController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {createSelector, Store} from '@ngrx/store';
import {applyDiscountOrderItem, deleteOrderItem, updateOrderItem} from '../../../data-access/order.actions';
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
  @ViewChild('inputQty') inputQtyRef: ElementRef;
  @ViewChild('inputPrice') inputPriceRef: ElementRef;
  @ViewChild('inputDescription') inputDescriptionRef: ElementRef;
  @ViewChild('inputDiscountType') inputDiscountTypeRef: ElementRef;
  @ViewChild('inputBagtag') inputBagtagRef: ElementRef;

  item$: Observable<OrderItem>;
  item;

  focusKey;
  keyBagtag = '';
  loadingGuest = false;

  constructor(
    private store: Store,
    private modalController: ModalController,
    private toastController: ToastController,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.item$ = this.store.select(createSelector(selectOrderState, state => state.order?.items?.find((_, idx) => idx === this.index)));
    this.item$.subscribe(item => this.item = item);
  }

  increase(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputQtyRef.nativeElement.focus();
    this.store.dispatch(updateOrderItem({index: this.index, item: {...this.item, quantity: this.item.quantity + 1}}));
  }

  decrease(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputQtyRef.nativeElement.focus();
    this.store.dispatch(updateOrderItem({
      index: this.index,
      item: {...this.item, quantity: this.item.quantity > 1 ? this.item.quantity - 1 : 0}
    }));
  }

  toggleDiscountType(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inputDiscountTypeRef.nativeElement.focus();

    this.store.dispatch(updateOrderItem({
      index: this.index,
      item: {...this.item, discount_type: this.item.discount_type === 'FIXED' ? 'PERCENTAGE' : 'FIXED'}
    }));
  }

  markFocus(key) {
    this.focusKey = key;
  }


  markApplyVoucher() {
    if (this.item.id) {
      //https://dev-inventory.api.easygolf.vn/1.0/order-products/9d87c631-65a1-46b4-a649-ac3df34826d4/voucher
    } else {
      this.store.dispatch(updateOrderItem({index: this.index, item: {...this.item, is_voucher: true}}));
    }

    if (this.focusKey && this[this.focusKey + 'Ref']) {
      this[this.focusKey + 'Ref'].nativeElement.focus();
    }
  }

  applyBagtag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.keyBagtag.trim() === '') {
      return;
    }
    this.loadingGuest = true;
    if (this.inputBagtagRef) {
      this.inputBagtagRef.nativeElement.focus();
    }

    /* const golfClubId = this.golfClubService.currentGolfClub ? this.golfClubService.currentGolfClub.id : '';
     this.guestService.getAllWithFilter(golfClubId, {search: this.keyBagtag}).subscribe(({data}) => {
       this.loadingGuest = false;
       if (data && data.length && data[0].bagtag === this.keyBagtag) {
         this.item.guest = data[0];
         this.presentToast('Apply success!', 'success');
       } else {
         this.presentToast('Guest not found!', 'danger');
       }
     }, error => {
       this.loadingGuest = false;
       console.log('error', error);
       this.presentToast('Guest not found!', 'danger');
     });*/
  }

  removeGuest() {
    this.item.guest = null;
  }

  applyDiscount(discount) {
    this.store.dispatch(applyDiscountOrderItem({
      item: this.item,
      index: this.index,
      discount: Number(discount) || 0,
      discount_type: this.item.discount_type
    }));
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
      this.store.dispatch(deleteOrderItem({item: this.item}));
      this.modalController.dismiss();
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get currentLang() {
    return this.translate.currentLang;
  }

}
