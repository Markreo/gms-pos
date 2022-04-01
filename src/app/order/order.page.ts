import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {enableMenu, selectCurrentLocation} from '../location/data-access/location.selectors';
import {Store} from '@ngrx/store';
import {selectCurrentGolfClub} from '../golf-club/data-access/selectors/golf-club.selectors';
import {
  selectActiveCategory, selectActiveMenu, selectMenus,
  selectParentCategories,
  selectStatusCategory,
} from '../category/data-access/category.selectors';
import * as CategoryActions from '../category/data-access/category.actions';
import {selectActiveSubCategory, selectSubCategories} from '../sub-category/data-access/sub-category.selectors';
import * as SubCategoryActions from '../sub-category/data-access/sub-category.actions';
import * as ProductActions from '../product/data-access/product.actions';
import {Actions} from '@ngrx/effects';
import {combineLatest, Subject} from 'rxjs';
import {AnimationController, IonSlides} from '@ionic/angular';
import {selectProductFilter, selectProductStateStatus, selectSlide} from '../product/data-access/product.selectors';
import {filter, map, takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {removeLastTable, selectTable} from '../table/table.actions';
import {selectCurrentTable} from '../table/table.selectors';
import {isScanning} from '../scan-barcode/data-access/scan-barcode.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides, {static: false}) ionSlidesRef: IonSlides;

  currentLocation$ = this.store.select(selectCurrentLocation);
  currentGolfClub$ = this.store.select(selectCurrentGolfClub);

  enableMenu$ = this.store.select(enableMenu);
  parentCategories$ = this.store.select(selectParentCategories);
  menus$ = this.store.select(selectMenus);
  activeParentCategory$ = this.store.select(selectActiveCategory);
  activeMenu$ = this.store.select(selectActiveMenu);
  statusCategory$ = this.store.select(selectStatusCategory);

  subCategories$ = this.store.select(selectSubCategories);
  activeSubCategory$ = this.store.select(selectActiveSubCategory);

  currentTable$ = this.store.select(selectCurrentTable);

  slides$ = this.store.select(selectSlide);
  productFilter$ = this.store.select(selectProductFilter);
  productStatus$ = this.store.select(selectProductStateStatus);

  currentLang = {};
  filter = {};

  destroy$ = new Subject();

  readonly listFakeProduct = Array(12).fill(0).map((_, i) => i);


  isCanning$ = this.store.select(isScanning);

  constructor(private store: Store,
              private actions$: Actions,
              private activatedRoute: ActivatedRoute,
              private animationCtrl: AnimationController) {
    combineLatest(this.store.select(selectCurrentGolfClub), this.activatedRoute.params).pipe(
      takeUntil(this.destroy$),
      filter(([golfClub, params]) => !!golfClub),
      map(([golfClub, params]) => params.id)
    ).subscribe(id => {
        this.store.dispatch(selectTable({id}));
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

  selectMenu(menu) {
    this.store.dispatch(CategoryActions.selectMenu({menu}));
  }

  toggleLang() {

  }

  updateSearch(value: string) {
    this.store.dispatch(ProductActions.triggerUpdateSearch({search: value}));
  }

  triggerSlideTo(e) {
    this.ionSlidesRef.getActiveIndex().then(index => {
      this.store.dispatch(ProductActions.updateForSlide({slide: index}));
    });
  }

  present() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.product-item'))
      .duration(300)
      .fromTo('opacity', '0.5', '1');
    animation.play();
  }

  removeLastTable() {
    this.store.dispatch(removeLastTable());
  }

  ngOnDestroy() {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
}
