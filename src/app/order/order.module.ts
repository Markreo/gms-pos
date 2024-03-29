import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OrderPageRoutingModule} from './order-routing.module';

import {OrderPage} from './order.page';
import {TranslateModule} from '@ngx-translate/core';
import {EffectsModule} from '@ngrx/effects';
import {OrderEffects} from './data-access/order.effects';
import {StoreModule} from '@ngrx/store';
import {orderFeatureKey, orderReducer} from './data-access/order.reducer';
import {OrderService} from './services/order.service';
import {CategoryModule} from '../category/category.module';
import {SubCategoryModule} from '../sub-category/sub-category.module';
import {SharedModule} from '../_helpers/shared/shared.module';
import {ProductModule} from '../product/product.module';
import {PaymentComponent} from './components/payment/payment.component';
import {TableModule} from '../table/table.module';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { OrderItemComponent } from './components/payment/order-item/order-item.component';
import { PaymentGuestComponent } from './components/payment/payment-guest/payment-guest.component';
import {GuestModule} from '../guest/guest.module';
import { DetailOrderItemComponent } from './components/payment/detail-order-item/detail-order-item.component';
import {ScanBarcodeModule} from '../scan-barcode/scan-barcode.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    TranslateModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    StoreModule.forFeature(orderFeatureKey, orderReducer),
    EffectsModule.forFeature([OrderEffects]),
    SharedModule,
    TableModule,
    GuestModule,
    ScanBarcodeModule
  ],
  declarations: [OrderPage, PaymentComponent, ProductItemComponent, OrderItemComponent, PaymentGuestComponent, DetailOrderItemComponent],
  providers: [OrderService]
})
export class OrderPageModule {
}
