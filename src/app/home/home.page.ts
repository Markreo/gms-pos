import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as GolfClubActions from '../golf-club/data-access/actions/golf-club.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(GolfClubActions.loadGolfClubs());
  }

}
