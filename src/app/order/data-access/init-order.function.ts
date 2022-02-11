import {Order} from '../models/order';
import {Table} from '../../table/table';

export const initOrderFunction = (table: Table | { id: string }) => new Order({
  items: [],
  table_map: {id: table.id},
  type: 'FB',
  payment_type: 'WITH_GOLF'
});
