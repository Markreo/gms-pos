import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../product/models/product';
import {addVariant} from '../../data-access/order.actions';
import {Store} from '@ngrx/store';
import {OrderService} from '../../services/order.service';
import {Variant} from '../../../product/models/variant';
import {ProductService} from '../../../product/services/product.service';
import {selectCurrentLocation} from '../../../location/data-access/location.selectors';
import {Location} from '../../../location/data-access/location';
import {updateAProductItem} from '../../../product/data-access/product.actions';

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

  currentStore: Location;

  constructor(private store: Store, private orderService: OrderService, private productService: ProductService) {
    this.store.select(selectCurrentLocation).subscribe(location => {
      this.currentStore = location;
    });
  }

  ngOnInit(): void {
  }

  triggerAddItem() {
    if (this.product.is_tracking_inventory && this.product.qty_in_stock <= 0) {
      return;
    }
    if (this.variant) {
      this.store.dispatch(addVariant({variant: this.variant}));
    } else if (this.product.variants?.length) {
      this.variant =  this.product.variants[0];
      this.store.dispatch(addVariant({variant: this.variant}));
    } else {
      this.loading = true;
      this.productService.getVariants(this.currentStore.id, this.product.id).subscribe(variants => {
        this.variant = variants[0];
        this.loading = false;
        this.store.dispatch(addVariant({variant: this.variant}));
      }, error => {
        this.loading = false;
      });
    }
  }
}
