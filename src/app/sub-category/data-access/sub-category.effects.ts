import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import * as CategoryActions from '../../category/data-access/category.actions';
import {Store} from '@ngrx/store';
import {selectCategories} from '../../category/data-access/category.selectors';
import {map} from 'rxjs/operators';
import * as SubCategoryActions from './sub-category.actions';


@Injectable()
export class SubCategoryEffects {


  selectParentCategory$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.selectParentCategory),
    concatLatestFrom(() => this.store.select(selectCategories)),
    map(([action, categories]) => SubCategoryActions.loadSubCategoriesSuccess({
      subCategories: action.category ? categories.filter(cate => cate.parent_id === action.category.id) : categories
    }))
  ));

  loadParentCategoriesSuccess = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadCategoriesSuccess),
    map((action) => SubCategoryActions.loadSubCategoriesSuccess({subCategories: action.categories.filter(cate => !!cate.parent_id)}))
  ));


  constructor(private actions$: Actions, private store: Store) {
  }

}
