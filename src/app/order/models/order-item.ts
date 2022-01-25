import {Variant} from '../../product/models/variant';

export class OrderItem {
  id: string;
  quantity: number;
  price: number;
  variant: Variant;
  discount: number;
  discount_type: 'PERCENTAGE' | 'FIXED';
}
