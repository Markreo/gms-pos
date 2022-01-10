import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, debounceTime, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as CategoryActions from './category.actions';
import * as LocationActions from '../../location/data-access/location.actions';
import {CategoryService} from '../services/category.service';


@Injectable()
export class CategoryEffects {


  setCurrentLocation = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => CategoryActions.loadCategories({location: action.location}))
  ));

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadCategories),
    tap(() => {
      console.log('loadCategories$');
    }),
    debounceTime(500),
    concatMap((action) =>
      this.categoryService.getAll(action.location.id).pipe(
        map(categories => CategoryActions.loadCategoriesSuccess({categories})),
        catchError(error => of(CategoryActions.loadCategoriesFailure({error}))))
    )
  ));


  constructor(private actions$: Actions,
              private categoryService: CategoryService) {
    console.log('CategoryEffects');
  }

}
