import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as AuthActions from '../auth/data-access/auth.actions';
import {selectAuthState} from '../auth/data-access/auth.selectors';
import {Router} from '@angular/router';
import {Subject} from "rxjs";
import {take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  formLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  authState = this.store.select(selectAuthState);
  destroy$ = new Subject();

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.formLogin.reset();
    this.authState.pipe(takeUntil(this.destroy$)).subscribe(state => {
      if (state.status === 'logged') {
        this.router.navigate(['/']);
      }
    });
  }

  async onLogin() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.valid) {
      this.store.dispatch(AuthActions.login({credentials: this.formLogin.value}));
    }
  }

  ngOnDestroy() {
    if (this.destroy$) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
}
