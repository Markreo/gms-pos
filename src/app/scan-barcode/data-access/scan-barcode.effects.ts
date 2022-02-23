import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as ScanBarcodeActions from './scan-barcode.actions';



@Injectable()
export class ScanBarcodeEffects {

  // loadScanBarcodes$ = createEffect(() => this.actions$.pipe(
  //
  //     ofType(ScanBarcodeActions.loadScanBarcodes),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => ScanBarcodeActions.loadScanBarcodesSuccess({ data })),
  //         catchError(error => of(ScanBarcodeActions.loadScanBarcodesFailure({ error }))))
  //     )
  //   ));



  constructor(private actions$: Actions) {}

}
