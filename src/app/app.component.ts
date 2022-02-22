import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private storage: Storage,
              private screenOrientation: ScreenOrientation) {
  }

  async ngOnInit() {
    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    await this.storage.create();
  }

}
