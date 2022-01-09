import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {switchMap, take, tap} from 'rxjs/operators';
import {from, Observable, throwError} from 'rxjs';
import {AuthService} from '../auth/services/auth.service';
import {Store} from '@ngrx/store';
import {selectAccessToken} from '../auth/data-access/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  accessToken$ = this.store.select(selectAccessToken);

  constructor(private authenticationService: AuthService, private store: Store) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.accessToken$).pipe(
      take(1),
      switchMap(token => {
        request = request.clone({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          setHeaders: {Authorization: `Bearer ${token}`}
        });
        return next.handle(request).pipe(
          tap(resp => {
          }, error => {
            if (error.status >= 500) {
              // this.toastService.danger('SERVER ERROR!');
            } else if (error.status === 401) {
              this.authenticationService.logout();
            } else {
              if (error.status === 400 || error.status === 403) {
                // this.toastService.danger(error.error.message);
                throwError(error);
              }
            }
          })
        );
      })
    );

  }
}

