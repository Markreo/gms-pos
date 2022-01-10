import {Component, OnInit} from '@angular/core';
import {selectCurrentLocation} from '../location/data-access/location.selectors';
import {Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../golf-club/data-access/selectors/golf-club.selectors';
import {selectParentCategories} from '../category/data-access/category.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  currentLocation$ = this.store.select(selectCurrentLocation);
  currentGolfClub$ = this.store.select(selectCurrentGolfClub);

  currentMenu = {};
  parentCategories$ = this.store.select(selectParentCategories);
  menus;
  currentLang = {};
  currentSubCate;
  subCategories;
  currentIndex;
  table = {};
  golfClub = {};
  filter = {};

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  selectParentCategory(s) {

  }

  selectMenu(s) {

  }

  toggleLang() {

  }

  selectSubCategory(s) {

  }

  updatePagination() {

  }

  updateSearch() {

  }

}
