import React from 'react';
import Image from 'next/image';
import { ICart } from '@/types';
import { apiUrl } from '@/constants';
import cls from '@/styles/_order.module.scss';

interface Props {
  item: ICart;
}

const OrderItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={cls.orderItem}>
      <Image
        width={100}
        height={70}
        priority
        quality={80}
        className={cls.img}
        src={apiUrl + '/' + item.product.image}
        alt={item.product.title}
      />
      <span className={cls.orderItem_title}>{item.product.title}</span>
      <span>x {item.amount}</span>
      <span className={cls.orderItem_price}>{item.product.actualPrice * item.amount} KGS</span>
    </div>
  );
};

export default OrderItem;
