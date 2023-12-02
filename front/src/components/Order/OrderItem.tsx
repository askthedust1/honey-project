import React from 'react';
import { ICart } from '@/types';
import { useAppDispatch } from '@/store/hook';

interface Props {
  item: ICart;
}

const OrderItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <span>{item.product.title}</span>
      <span> x </span>
      <span>{item.amount}</span>
      <span> = </span>
      <span>{item.product.actualPrice * item.amount} KGS</span>
    </div>
  );
};

export default OrderItem;
