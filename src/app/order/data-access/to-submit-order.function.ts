import {Order} from '../models/order';

export const toSubmitOrderFunction = (order: Order) => ({
    id: order.id,
    type: 'FB',
    guest: order.guest ? order.guest.id : undefined,
    items: order.items.map(item => ({
      order_product: item.id,
      variant: item.variant.id,
      quantity: item.quantity,
      price: item.price,
      description: item.description,
      discount: item.discount,
      discount_type: item.discount_type,
      is_voucher: item.is_voucher,
      guest: item.guest ? item.guest.id : undefined,
      menu: item.menu ? item.menu.id : undefined
    })),
    description: order.description,
    table_map: order.table_map.id,
    discount: order.discount,
    discount_type: order.discount_type,
    num_of_guests: order.num_of_guests,
    voucher: order.voucher
  });
