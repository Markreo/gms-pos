import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectOrder, selectOrderAction, selectOrderStatus} from '../../data-access/order.selectors';
import {Order} from '../../models/order';
import {TranslateService} from '@ngx-translate/core';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {checkoutOrder, setPaymentType, submitOrder} from '../../data-access/order.actions';

import {DetailOrderItemComponent} from './detail-order-item/detail-order-item.component';
import {caculatorDiscount} from '../../../_helpers/functions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  loading = false;
  order$ = this.store.select(selectOrder);
  status$ = this.store.select(selectOrderStatus);
  action$ = this.store.select(selectOrderAction);
  golfClub = {};
  someItemHasGuest = false;
  order: Order;

  constructor(private store: Store,
              private translateService: TranslateService,
              private modalController: ModalController,
              public alertController: AlertController) {
    this.order$.subscribe(order => {
      this.order = order;
    });
  }

  ngOnInit(): void {
  }

   submitOrder() {
     this.alertController.create({
      subHeader: 'Submit Order',
      message: 'Do you want to confirm this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            this.store.dispatch(submitOrder());
          }
        }
      ]
    }).then(alert => alert.present());

  }

  checkoutOrder() {
    this.alertController.create({
      subHeader: 'Checkout Order',
      message: 'Do you want to checkout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          id: 'confirm-button',
          handler: () => {
            this.store.dispatch(checkoutOrder());
          }
        }
      ]
    }).then(alert => alert.present());

  }

  getTotal() {
    return this.order.items.reduce((total, item) => total += this.getItemTotal(item), 0);
  }

  getItemTotal(item) {
    if (item.is_voucher) {
      return 0;
    } else {
      return item.price * item.quantity - caculatorDiscount(item, item.price, item.quantity);
    }
  }

  getOrderDiscount() {
    return caculatorDiscount(this.order, this.getTotal());
  }


  setPaymentType(type: 'WITH_GOLF' | 'CITY_LEDGER' | 'CASH' | 'VOUCHER') {
    this.store.dispatch(setPaymentType({paymentType: type}));
  }

  showDetailOrderItem(index) {
    this.modalController.create({
      component: DetailOrderItemComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {index},
    }).then(modal => modal.present());
  }

}
