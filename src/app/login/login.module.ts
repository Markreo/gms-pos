import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {TranslateModule} from '@ngx-translate/core';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    AuthModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {
}
