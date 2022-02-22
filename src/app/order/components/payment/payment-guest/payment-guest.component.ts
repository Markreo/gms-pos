import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  selectCurrentGuest,
  selectGuest,
  selectGuestFocus,
  selectGuestStatus, selectListGuests,
  selectSearchGuestStr
} from '../../../../guest/data-access/guest.selectors';
import {clearSearch, inputSearch, setGuest} from '../../../../guest/data-access/guest.actions';
import {ToastController} from '@ionic/angular';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-payment-guest',
  templateUrl: './payment-guest.component.html',
  styleUrls: ['./payment-guest.component.scss'],
})
export class PaymentGuestComponent implements OnInit {
selectGuest$ = this.store.select(selectGuest);
search$ = this.store.select(selectSearchGuestStr);
focus$ = this.store.select(selectGuestFocus);
status$ = this.store.select(selectGuestStatus);
guests$ = this.store.select(selectListGuests);
currentGuest$ = this.store.select(selectCurrentGuest);
  disabled = false;

  constructor( private store: Store, private toastController: ToastController) {
  }

  ngOnInit(): void {
  }

  setInputSearch(e) {
    this.store.dispatch(inputSearch({search: e.target.value}));
  }

  removeGuest() {

  }

   scanBarcode() {
    BarcodeScanner.hideBackground(); // make background of WebView transparent

     // BarcodeScanner.startScan().then(result => {
     //   console.log('result', result);
     // }).catch(error => {
     //   console.log('errior ', error);
     // });
  }

  onClickGuest(guest) {
this.store.dispatch(setGuest({guest}));
  }

  clearSearch() {
    this.store.dispatch(clearSearch());
  }


}
