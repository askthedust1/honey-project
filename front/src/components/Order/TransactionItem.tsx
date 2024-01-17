import React from 'react';
import Image from 'next/image';
import { IProductOfKits } from '@/types';
import { apiUrl } from '@/constants';
import cls from '@/styles/_transaction.module.scss';

interface Props {
  item: IProductOfKits;
}

const TransactionItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={cls.productItem}>
      <Image
        style={{ objectFit: 'contain' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        quality={80}
        fill
        className={cls.cardImg}
        src={apiUrl + '/' + item.product.image}
        alt={item.product.title}
      />
      <span className={cls.amount}>
        <span>{item.amount}</span>
      </span>
    </div>
  );
};

export default TransactionItem;
