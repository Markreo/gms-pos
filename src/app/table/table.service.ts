import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Table} from './table';
import {buildUrl} from '../_helpers/functions';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {
  }

  getAll(golfId: string, locationId: string, search?: string) {
    return this.http.get<Table[]>(buildUrl(`golf/clubs/${golfId}/tables?location=${locationId}&search=${search}`));
  }

  clean() {

  }

  get(golfClubId, tableId) {
    return this.http.get<Table>(buildUrl(`golf/clubs/${golfClubId}/tables/${tableId}`));
  }
}
