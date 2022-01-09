import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage-angular';

@Injectable()
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    // eslint-disable-next-line no-underscore-dangle
    return this._storage.set(key, value);
  }

  public get(key) {
    // eslint-disable-next-line no-underscore-dangle
    return this._storage.get(key);
  }
}
