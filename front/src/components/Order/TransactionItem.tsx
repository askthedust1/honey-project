import React from 'react';
import { IProductOfKits } from '@/types';

interface Props {
  item: IProductOfKits;
}

const TransactionItem: React.FC<Props> = ({ item }) => {
  return (
    <div>
      {/*<span>{item.product.title}</span>*/}
      <span>Нужен title!: {item.product._id}</span>
      <span> x </span>
      <span>{item.amount} шт.</span> <span> </span>
      <span>( * {item.price}) KGS</span>
    </div>
  );
};

export default TransactionItem;
