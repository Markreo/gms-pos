import { Component, OnInit } from '@angular/core';
import {DetailOrderItemStore} from './detail-order-item.store';

@Component({
  selector: 'app-detail-order-item',
  templateUrl: './detail-order-item.component.html',
  styleUrls: ['./detail-order-item.component.scss'],
  providers: [DetailOrderItemStore],
})
export class DetailOrderItemComponent implements OnInit {
  constructor(private detailOrderItemStore: DetailOrderItemStore ) { }

  ngOnInit(): void {
  }

}
