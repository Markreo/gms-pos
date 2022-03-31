import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/order';
import {buildInventoryUrl, convertDataToServer} from '../../_helpers/functions';
import {OrderItem} from '../models/order-item';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrder(golfClubId, tableId) {
    return this.http.get<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders?table=' + tableId);
  }

  createOrder(golfClubId, data) {
    return this.http.post<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders', data);
  }

  updateOrder(golfClubId, orderId, data) {
    return this.http.put<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders/' + orderId, data);
  }

  checkoutOrder(orderId: string, data) {
    return this.http.put<any>(buildInventoryUrl('orders/' + orderId + '/checkout'), data);
  }

  applyDiscountOrderItem(orderItemId, data: { discount; discount_type }) {
    return this.http.patch<OrderItem>(buildInventoryUrl('order-products/') + orderItemId, data);
  }

  updateDescription(orderItemId, data: { description }) {
    return this.http.patch<OrderItem>(buildInventoryUrl('order-products/') + orderItemId, data);
  }

  applyVoucherOrderItem(orderItemId: string) {
    return this.http.put<Order>(buildInventoryUrl('order-products/') + orderItemId + '/voucher', {});
  }

  applyGuestOrderItem(orderItemId: string, guestId: string) {
    return this.http.patch<OrderItem>(buildInventoryUrl('order-products/') + orderItemId , {guest: guestId});
  }

  updateGuest(golfClubId, orderId, data) {
    console.log('actionGuest.guest', data);
    return this.http.patch<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders/' + orderId, data);
  }
}
