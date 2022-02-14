import { Component, OnInit } from '@angular/core';
import {StorageService} from '../ionic-storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.storageService.clear().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
