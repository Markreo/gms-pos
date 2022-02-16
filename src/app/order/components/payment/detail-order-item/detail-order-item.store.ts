import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {OrderItem} from '../../../models/order-item';
import {EMPTY, from, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {DetailOrderItemComponent} from './detail-order-item.component';

export interface DetailOrderItemState {
  item: OrderItem;
};

const initialState: DetailOrderItemState = {
  item: null
};

@Injectable()
export class DetailOrderItemStore extends ComponentStore<DetailOrderItemState> {
  readonly selectItem$ = this.select(state => state.item);
  // readonly selectItem$showModal = this.effect(() =>this.ac)

  private readonly  setItem = this.updater((state, item: OrderItem) => ({...state, item}));


  constructor(private modalController: ModalController) {
    super(initialState);
  }


}
