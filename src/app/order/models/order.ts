import {OrderItem} from './order-item';
import {Table} from '../../table/table';

export class Order {
  id: string;
  items: OrderItem[];
  table_map: Partial<Table>;
  type: 'FB';

  constructor(entity: Partial<Order> = {}) {
    this.id = entity.id;
    this.items = entity.items || [];
    this.table_map = entity.table_map;
    this.type = entity.type || 'FB';
  }
}
