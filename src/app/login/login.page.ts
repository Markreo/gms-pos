import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitted = false;
  credentials = {
    username: '',
    password: ''
  };

  constructor() {
  }

  ngOnInit() {
  }

  onLogin(form) {
    console.log('form', form)

  }
}
