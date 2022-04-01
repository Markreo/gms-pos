import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Network} from '@awesome-cordova-plugins/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Network]
})
export class AppComponent implements OnInit {

  constructor(private storage: Storage            ) {
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
