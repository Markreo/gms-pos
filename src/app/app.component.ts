import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Network} from '@awesome-cordova-plugins/network/ngx';
import {Store} from '@ngrx/store';
import {loadAuth} from './auth/data-access/auth.actions';
import {AlertController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Network]
})
export class AppComponent implements OnInit {

  constructor(private storage: Storage,
              private store: Store,
              private alertController: AlertController,
              private toastController: ToastController,
              private network: Network) {
  }

  async ngOnInit() {
    await this.storage.create();
    // this.network.onChange().subscribe(status => {
    //   console.log('status network', status);
    //   this.toastController.create({message: status, header:'change', duration: 1000}).then(toast => toast.present());
    // });
    // this.network.onConnect().subscribe(() => {
    //   this.store.dispatch(loadAuth());
    // });
  }

}
