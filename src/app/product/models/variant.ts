export class Variant {
  id: string;
  sale_price: number;
  discount: number;
  image: string;
  name: string;
  other_name: string;
  product: {
    is_tracking_inventory: boolean;
  };
  qty_in_stock: number;
}
