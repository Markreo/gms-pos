import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {buildInventoryUrl} from '../../_helpers/functions';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Variant} from '../models/variant';

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAllWithFilter(locationId, menu, filter: any = {}) {
    console.log('getAllWithFilter', menu);
    const query = Object.keys(filter).reduce((qry, key) => {
      if (filter[key]) {
        qry += '&' + key + '=' + filter[key];
      }
      return qry;
    }, '');
    if (menu) {
      return this.http.get<{ total: number; data: Product[] }>(buildInventoryUrl('store-locations/' + locationId + '/menus/' + menu.id + '/products') + `?` + query);
    } else {
      return this.http.get<{ total: number; data: Product[] }>(buildInventoryUrl('stores/' + locationId + '/products') + `?` + query);
    }

  }

  getVariants(storeId, productId): Observable<Variant[]> {
    return this.http.get(buildInventoryUrl('stores/') + storeId + '/products/' + productId).pipe(
      map((product: Product) => product.variants || [])
    );
  }
}
