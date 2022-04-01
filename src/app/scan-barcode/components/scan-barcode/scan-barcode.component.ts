import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {stopScanBarcode} from '../../data-access/scan-barcode.actions';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {AlertController} from '@ionic/angular';
import {scanBagtag} from '../../../order/data-access/order.actions';

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

    this.checkPermission().then(result => {
      if (result) {
        BarcodeScanner.hideBackground().then(() => console.log('hide background'));
        BarcodeScanner.startScan().then(({hasContent, content}) => {
          if(hasContent) {
            this.store.dispatch(scanBagtag({bagtag: content}));
          }
          this.closeModal();
        });
      } else {
        this.closeModal();
      }
    });

  }

  closeModal() {
    this.store.dispatch(stopScanBarcode());
  }

  ngOnDestroy() {
    BarcodeScanner.showBackground().then(() => console.log('show background'));
    BarcodeScanner.stopScan().then(() => console.log('stopScan'));
  }


  async checkPermission(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({force: true});
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                resolve(false);
              }
            },
            {
              text: 'Open settings',
              handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
              }
            }
          ]
        });
        await alert.present();
      } else {
        resolve(false);
      }
    });
  };

}
