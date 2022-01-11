import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {selectCurrentLocation} from '../location/data-access/location.selectors';
import {Action, Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../golf-club/data-access/selectors/golf-club.selectors';
import {
  selectActiveCategory,
  selectParentCategories,
  selectStatusCategory,
} from '../category/data-access/category.selectors';
import * as CategoryActions from '../category/data-access/category.actions';
import {
  selectActiveSubCategory,
  selectSubCategories
} from '../sub-category/data-access/sub-category.selectors';
import * as SubCategoryActions from '../sub-category/data-access/sub-category.actions';
import * as ProductActions from '../product/data-access/product.actions';
import {Actions, ofType} from '@ngrx/effects';
import {Subject} from 'rxjs';
import {IonSlides} from '@ionic/angular';
import {selectSlide} from '../product/data-access/product.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides, {static: true}) ionSlidesRef: IonSlides;

  currentLocation$ = this.store.select(selectCurrentLocation);
  currentGolfClub$ = this.store.select(selectCurrentGolfClub);

  parentCategories$ = this.store.select(selectParentCategories);
  activeParentCategory$ = this.store.select(selectActiveCategory);
  statusCategory$ = this.store.select(selectStatusCategory);

  subCategories$ = this.store.select(selectSubCategories);
  activeSubCategory$ = this.store.select(selectActiveSubCategory);

  slides$ = this.store.select(selectSlide);

  currentLang = {};
  filter = {};

  destroy$ = new Subject();

  readonly listFakeProduct = Array(20).fill(0).map((_, i) => i);

  constructor(private store: Store, private actions$: Actions) {
    this.actions$.pipe(
      ofType(ProductActions.loadProductsSuccess)
    ).subscribe(() => {
      this.ionSlidesRef.update().then(() => {
        console.log('slide updated');
      });
    });
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

  triggerSlideTo(e) {
    console.log(e);
    this.ionSlidesRef.getActiveIndex().then(index => {
      console.log('triggerSlideTo', index);
      this.store.dispatch(ProductActions.loadProducts({slide: index}));
    })
  }

  ngOnDestroy() {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
}
