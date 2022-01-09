import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {buildUrl} from '../../_helpers/functions';
import {Location} from '../data-access/location';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {
  }

  getAllByClub(clubId) {
    return this.http.get<Location[]>(buildUrl(`golf/clubs/${clubId}/store-locations`));
  }

}
