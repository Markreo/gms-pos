import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';
import {buildInventoryUrl} from '../../_helpers/functions';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  getAll(locationId) {
    return this.http.get<Category[]>(buildInventoryUrl('store-locations/' + locationId + '/product-categories'));
  }
}
