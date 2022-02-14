import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {selectCurrentLocation} from '../location/data-access/location.selectors';
import {Store} from '@ngrx/store';
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
import {combineLatest, Subject} from 'rxjs';
import {AnimationController, IonSlides} from '@ionic/angular';
import {selectProductFilter, selectProductStateStatus, selectSlide} from '../product/data-access/product.selectors';
import {delay, filter, map, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {selectTable} from '../table/table.actions';
import {selectCurrentTable} from '../table/table.selectors';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides, {static: false}) ionSlidesRef: IonSlides;

  currentLocation$ = this.store.select(selectCurrentLocation);
  currentGolfClub$ = this.store.select(selectCurrentGolfClub);

  parentCategories$ = this.store.select(selectParentCategories);
  activeParentCategory$ = this.store.select(selectActiveCategory);
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

  readonly listFakeProduct = Array(20).fill(0).map((_, i) => i);

  constructor(private store: Store,
              private actions$: Actions,
              private activatedRoute: ActivatedRoute,
              private animationCtrl: AnimationController) {
    /*this.actions$.pipe(
      ofType(ProductActions.loadProductsSuccessAndReset),
      delay(10),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.ionSlidesRef.update().then(() => {
        this.ionSlidesRef.slideTo(0).then(() => {
          console.log('update slide to 0');
        });
      });
    });*/
    combineLatest(this.store.select(selectCurrentGolfClub), this.activatedRoute.params).pipe(
      takeUntil(this.destroy$),
      filter(([golfClub, params]) => !!golfClub),
      map(([golfClub, params]) => params.id)
    ).subscribe(id => {
        this.store.dispatch(selectTable({id}));
      }, console.log
      , () => console.log('complete'));
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

  updateSearch(event) {
    this.store.dispatch(ProductActions.triggerUpdateSearch({search: event.target.value}));
  }

  triggerSlideTo(e) {
    console.log(e);
    this.ionSlidesRef.getActiveIndex().then(index => {
      console.log('triggerSlideTo', index);
      this.store.dispatch(ProductActions.updateForSlide({slide: index}));
    });
  }

  present() {
    console.log('document.querySelector(\'.product-item\')', document.querySelector('.product-item'));
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.product-item'))
      .duration(300)
      .fromTo('opacity', '0.5', '1');
    animation.play().then(() => console.log('play done'));
  }

  ngOnDestroy() {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
}
