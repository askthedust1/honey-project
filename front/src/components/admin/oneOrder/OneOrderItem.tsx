import React from 'react';
import { IProductOfKits } from '@/types';
import cls from '../../../styles/_adminOneOrder.module.scss';

interface Props {
  item: IProductOfKits;
}

const OneOrderItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={cls.listItemBlock}>
      <li className={cls.listItem}>
        <span className={cls.innerSpanList}>{item.product.translations.ru.title}</span>
        <span className={cls.innerSpanList}>:</span>
        <span className={cls.innerSpanList}>{item.amount}</span>
        <span className={cls.innerSpanList}>x</span>
        <span className={cls.innerSpanList}>{item.product.actualPrice}</span>
        <span className={cls.innerSpanList}>KGS</span>
      </li>
    </div>
  );
};

export default OneOrderItem;
