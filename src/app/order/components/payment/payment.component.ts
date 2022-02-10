import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectOrder, selectOrderAction, selectOrderStatus} from '../../data-access/order.selectors';
import {Order} from '../../models/order';
import {TranslateService} from '@ngx-translate/core';
import {ActionSheetController} from '@ionic/angular';
import {checkoutOrder, submitOrder} from '../../data-access/order.actions';

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
              private actionSheetController: ActionSheetController) {
    this.order$.subscribe(order => this.order = order);
  }

  ngOnInit(): void {
  }

  async presentActionSheet() {
    if (this.order.id) {
      const actionSheet = await this.actionSheetController.create({
        buttons: [
          {
            text: this.translateService.instant('update_order'),
            handler: () => {
              this.store.dispatch(submitOrder());
            }
          },
          {
            text: this.translateService.instant('checkout'),
            handler: () => {
              this.store.dispatch(checkoutOrder());
            }
          },
          {
            text: this.translateService.instant('cancel'),
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await actionSheet.present();
    } else {
      this.store.dispatch(submitOrder());
    }
  }

  getTotal() {
    return 0;
  }

  getOrderDiscount() {
    return 0;
  }

  remove(i) {

  }

  setGuest(e) {

  }

  updateItem(i) {

  }


}
