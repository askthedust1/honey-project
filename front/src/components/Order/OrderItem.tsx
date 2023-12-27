import React from 'react';
import { ICart } from '@/types';
import cls from '@/styles/order.module.scss';
import { apiUrl } from '@/constants';

interface Props {
  item: ICart;
}

const OrderItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={cls.orderItem}>
      <img className={cls.img} src={apiUrl + '/' + item.product.image} alt={item.product.title} />
      <span className={cls.orderItem_title}>{item.product.title}</span>
      <span>x {item.amount}</span>
      <span className={cls.orderItem_price}>{item.product.actualPrice * item.amount} KGS</span>
    </div>
  );
};

export default OrderItem;
