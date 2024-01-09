import React from 'react';
import { IProductOfKits } from '@/types';
import cls from '@/styles/transaction.module.scss';
import { apiUrl } from '@/constants';

interface Props {
  item: IProductOfKits;
}

const TransactionItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={cls.productItem}>
      <img className={cls.img} src={apiUrl + '/' + item.product.image} alt={item.product.title} />
      <span className={cls.amount}>
        <span>{item.amount}</span>
      </span>
    </div>
  );
};

export default TransactionItem;
