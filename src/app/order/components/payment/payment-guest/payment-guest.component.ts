import {Component, OnInit} from '@angular/core';
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';
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

@Component({
  selector: 'app-payment-guest',
  templateUrl: './payment-guest.component.html',
  styleUrls: ['./payment-guest.component.scss'],
  providers: [BarcodeScanner]
})
export class PaymentGuestComponent implements OnInit {
selectGuest$ = this.store.select(selectGuest);
search$ = this.store.select(selectSearchGuestStr);
focus$ = this.store.select(selectGuestFocus);
status$ = this.store.select(selectGuestStatus);
guests$ = this.store.select(selectListGuests);
currentGuest$ = this.store.select(selectCurrentGuest);
  disabled = false;

  constructor(private barcodeScanner: BarcodeScanner, private store: Store, private toastController: ToastController) {
  }

  ngOnInit(): void {
  }

  setInputSearch(e) {
    this.store.dispatch(inputSearch({search: e.target.value}));
  }

  removeGuest() {

  }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('barcodeData', barcodeData);
      // this.loading = true;
      // this.guestService.getAllWithFilter(this.golfClub.id, {search: barcodeData.text}).subscribe(({data}) => {
      //   console.log('data', data);
      //   this.loading = false;
      //   if (data && data.length) {
      //     this.onClickGuest(data[0]);
      //   }
      // }, error => {
      //   this.loading = false;
      //   console.log('error', error);
      // });
    }).catch(err => {
      this.toastController.create({header: 'Scan barcode:',message: err, color: 'danger', duration: 1500}).then(toast => {
        toast.present();
      });
    });
  }

  onClickGuest(guest) {
this.store.dispatch(setGuest({guest}));
  }

  clearSearch() {
    this.store.dispatch(clearSearch());
  }


}
