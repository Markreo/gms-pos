import {OrderItem} from './order-item';
import {Table} from '../../table/table';
import {Guest} from './guest';

export class Order {
  id: string;
  items: OrderItem[];
  table_map: Partial<Table> & Pick<Table, 'id'>;
  type: 'FB';
  payment_type: 'WITH_GOLF' | 'CITY_LEDGER' | 'CASH' | 'VOUCHER'; // chỉ dùng khi checkout
  guest: Guest;

  discount: number;
  discount_type: 'PERCENTAGE' | 'FIXED';
  description: string;
  num_of_guests: number;
  voucher: { code: string };

  constructor(entity: Partial<Order> = {}) {
    this.id = entity.id;
    this.items = entity.items || [];
    this.table_map = entity.table_map;
    this.type = entity.type || 'FB';
    this.payment_type = entity.payment_type || 'WITH_GOLF';
    this.guest = entity.guest;

    this.discount = entity.discount || 0;
    this.discount_type = entity.discount_type;
    this.num_of_guests = entity.num_of_guests;
    this.voucher = entity.voucher;
  }
}
