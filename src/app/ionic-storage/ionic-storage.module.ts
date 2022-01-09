import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageService} from './storage.service';
import * as IonicStorage from '@ionic/storage-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorage.IonicStorageModule.forRoot()
  ],
  providers: [StorageService]
})
export class IonicStorageModule {
}
