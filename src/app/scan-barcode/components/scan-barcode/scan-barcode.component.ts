import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {stopScanBarcode} from '../../data-access/scan-barcode.actions';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-scan-barcode',
  templateUrl: './scan-barcode.component.html',
  styleUrls: ['./scan-barcode.component.scss'],
})
export class ScanBarcodeComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    console.log('ScanBarcodeComponent oniInit');
    BarcodeScanner.hideBackground().then(() => console.log('hide background'));
    BarcodeScanner.startScan().then(result => {
      console.log('result', result);
    });
  }

  closeModal() {
    this.store.dispatch(stopScanBarcode());
  }

  ngOnDestroy() {
    BarcodeScanner.showBackground().then(() => console.log('show background'));
    BarcodeScanner.stopScan().then(() => console.log('stopScan'));
  }


  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({force: true});
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          }, {
            text: 'Open settings',
            handler: () => {
              BarcodeScanner.openAppSettings();
              resolve(false);
            }
          }]
        });
        await alert.present();
      } else {
        resolve(false);
      }
    });
  };

}
