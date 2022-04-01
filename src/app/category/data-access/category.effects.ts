import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, debounceTime, filter, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as CategoryActions from './category.actions';
import * as LocationActions from '../../location/data-access/location.actions';
import {CategoryService} from '../services/category.service';
import { logout } from 'src/app/auth/data-access/auth.actions';


@Injectable()
export class CategoryEffects {

  logout = createEffect(() => this.actions$.pipe(
    ofType(logout),
    map(action => CategoryActions.resetMenu())
  ));


  setCurrentLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => {
      if (action.location.enable_menu) {
        return CategoryActions.loadMenus({location: action.location});
      } else {
        return CategoryActions.loadCategories({location: action.location});
      }
    })
  ));

  setCurrentLocation$reset = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.setCurrentLocation),
    map(action => CategoryActions.resetMenu())
  ));

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadCategories),
    debounceTime(500),
    concatMap((action) => this.categoryService.getAll(action.location.id).pipe(
      map(categories => CategoryActions.loadCategoriesSuccess({categories})),
      catchError(error => of(CategoryActions.loadCategoriesFailure({error})))
    ))
  ));

  loadMenus$ = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadMenus),
    debounceTime(500),
    concatMap((action) => this.categoryService.getAllMenu(action.location.id).pipe(
      map(({data}) => CategoryActions.loadMenusSuccess({menus: data})),
      catchError(error => of(CategoryActions.loadCategoriesFailure({error})))
    ))
  ));

  setFirstMenu = createEffect(() => this.actions$.pipe(
    ofType(CategoryActions.loadMenusSuccess),
    filter(action => !!action.menus.length),
    map(action => CategoryActions.selectMenu({menu: action.menus[0]}))
  ));


  constructor(private actions$: Actions,
              private categoryService: CategoryService) {
  }

}
