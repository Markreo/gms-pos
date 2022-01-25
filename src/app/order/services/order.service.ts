import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../models/order';
import {buildInventoryUrl, convertDataToServer} from '../../_helpers/functions';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrder(golfClubId, tableId) {
    return this.http.get<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders?table=' + tableId);
  }

  createOrder(golfClubId, data) {
    return this.http.post<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders', convertDataToServer(data));
  }

  updateOrder(golfClubId, orderId, data) {
    return this.http.put<Order>(buildInventoryUrl('/golf/clubs/' + golfClubId) + '/orders/' + orderId, convertDataToServer(data));
  }

}
