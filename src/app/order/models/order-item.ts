import {Variant} from '../../product/models/variant';
import {Guest} from './guest';

export class OrderItem {
  id: string;
  quantity: number;
  price: number;
  variant: Variant;
  discount: number;
  discount_type: 'PERCENTAGE' | 'FIXED';
  description: string;
  is_voucher: boolean;
  guest: Guest;
  menu: {id: string};

  constructor(entity: Partial<OrderItem>) {
    this.id = entity.id;
    this.quantity = entity.quantity;
    this.price = entity.price;
    this.variant = entity.variant;
    this.discount = entity.discount;
    this.discount_type = entity.discount_type;
    this.description = entity.description;
    this.is_voucher = entity.is_voucher;
    this.guest = entity.guest;
    this.menu = entity.menu;
  }
}
