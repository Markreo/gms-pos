import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {environment} from '../environments/environment';
import {AuthService} from './auth/services/auth.service';
import {Store} from '@ngrx/store';
import {selectAccessToken} from './auth/data-access/auth.selectors';
import {filter, take} from 'rxjs/operators';

export const myRxStompConfig = (store: Store): InjectableRxStompConfig => ({
    // Which server?
    brokerURL: environment.gms_websocket_server,

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeatIncoming: 0, // Typical value 0 - disabled
    heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 500 (500 milli seconds)
    reconnectDelay: 200,

    // Will log diagnostics on console
    // It can be quite verbose, not recommended in production
    // Skip this key to stop logging to console
    // debug: (msg: string): void => {
    //   console.log(new Date(), msg);
    // },
    connectionTimeout: 10000,
    beforeConnect: client => new Promise<void>(resolve => {
        store.select(selectAccessToken).pipe(
          filter(token => !!token),
          take(1)
        ).subscribe(token => {
          client.configure({
            connectHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          resolve();
        });
      })
  });