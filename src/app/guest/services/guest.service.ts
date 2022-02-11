import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Guest} from '../../order/models/guest';
import {buildUrl, getToday} from '../../_helpers/functions';

@Injectable({providedIn: 'root'})
export class GuestService {
  constructor(private http: HttpClient) {
  }

  getAllWithFilter(golfClubId: string, filter: {search: string}) {
    // eslint-disable-next-line max-len
    return this.http.get<{ total; data: Guest[] }>(buildUrl('/golf/clubs/' + golfClubId) + `/guests?date=${getToday().getTime()}&status=CHECKIN,CHECKOUT&fields=id,bagtag&start=0&max=9999&search=${filter.search}`);
  }
}
