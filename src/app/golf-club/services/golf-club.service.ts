import {HttpClient} from '@angular/common/http';
import {GolfClub} from '../models/golf-club.model';
import {buildUrl} from '../../_helpers/functions';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GolfClubService {

  constructor(private http: HttpClient) {
  }

  getAllByUser() {
    return this.http.get<GolfClub[]>(buildUrl('golf/clubs'));
  }

}
