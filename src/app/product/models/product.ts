import {Variant} from './variant';

export class Product {
  id: string;
  name: string;
  other_name: string;
  sale_price: number;
  price: number;
  variants: Variant[];
  is_tracking_inventory: boolean;
  qty_in_stock: number;
  image: string;
}
