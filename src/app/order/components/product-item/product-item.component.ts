import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../product/models/product';
import * as OrderActions from "../../data-access/order.actions";
import {Store} from "@ngrx/store";
import {OrderService} from "../../services/order.service";
import {createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {Variant} from "../../../product/models/variant";
import {addVariant} from "../../data-access/order.actions";
import {ProductService} from "../../../product/services/product.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  currentLang = 'en';
  variant: Variant;
  loading = false;

  constructor(private store: Store, private orderService: OrderService, private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  triggerAddItem(product) {
    if (this.variant) {
      this.store.dispatch(addVariant({variant: this.variant}));
    } else {
      this.loading = true;
      this.productService.getVariants(this.product.id).subscribe(variants => {
        this.variant = variants[0];
        this.loading = false;
        this.store.dispatch(addVariant({variant: this.variant}));
      }, error => {
        this.loading = false;
      })
    }
  }
}
