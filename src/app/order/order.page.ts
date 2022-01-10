import {Component, OnInit} from '@angular/core';
import {selectCurrentLocation} from '../location/data-access/location.selectors';
import {Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../golf-club/data-access/selectors/golf-club.selectors';
import {
  selectActiveCategory,
  selectParentCategories,
} from '../category/data-access/category.selectors';
import * as CategoryActions from '../category/data-access/category.actions';
import {
  selectActiveSubCategory,
  selectSubCategories
} from '../sub-category/data-access/sub-category.selectors';
import * as SubCategoryActions from "../sub-category/data-access/sub-category.actions";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  currentLocation$ = this.store.select(selectCurrentLocation);
  currentGolfClub$ = this.store.select(selectCurrentGolfClub);

  parentCategories$ = this.store.select(selectParentCategories);
  activeParentCategory$ = this.store.select(selectActiveCategory);

  subCategories$ = this.store.select(selectSubCategories);
  activeSubCategory$ = this.store.select(selectActiveSubCategory);


  currentLang = {};
  filter = {};

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  selectParentCategory(category) {
    this.store.dispatch(CategoryActions.selectParentCategory({category}));
  }

  selectSubCategory(category) {
    this.store.dispatch(SubCategoryActions.activeSubCategory({subCategory: category}));
  }

  selectMenu(s) {

  }

  toggleLang() {

  }


  updatePagination() {

  }

  updateSearch() {

  }

}
