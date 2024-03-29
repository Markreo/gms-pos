import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectTables, selectTableStatus} from '../table/table.selectors';
import {selectCurrentLocation, selectLocations} from '../location/data-access/location.selectors';
import {selectCurrentGolfClub, selectGolfClubs} from '../golf-club/data-access/selectors/golf-club.selectors';
import * as GolfClubActions from '../golf-club/data-access/actions/golf-club.actions';
import * as LocationActions from '../location/data-access/location.actions';
import {logout} from '../auth/data-access/auth.actions';
import {StorageService} from '../ionic-storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentGolfClub$ = this.store.select(selectCurrentGolfClub);
  golfClubs$ = this.store.select(selectGolfClubs);

  currentLocation$ = this.store.select(selectCurrentLocation);
  locations$ = this.store.select(selectLocations);

  tables$ = this.store.select(selectTables);
  tableStatus$ = this.store.select(selectTableStatus);


  currentLang = 'en';

  constructor(private store: Store, private storageService: StorageService, private router: Router) {
  }

  ngOnInit() {
    this.storageService.get('LAST_TABLE').then(lastTable => {
      console.log('last table', lastTable);
      if (lastTable) {
        this.router.navigate(['/order', lastTable.id]);
      }
    });
  }

  setCurrentGolfClub(event) {
    this.store.dispatch(GolfClubActions.setCurrentGolfClub({golfClub: event.detail.value}));
  }

  setCurrentLocation(event) {
    this.store.dispatch(LocationActions.setCurrentLocation({location: event.detail.value}));
  }

  doRefresh(e) {

  }

  compareWithId = (a, b) => a && b ? a.id === b.id : a === b;

  toggleLang() {

  }

  logout() {
    this.store.dispatch(logout());
  }

  updateSearch() {

  }

}
