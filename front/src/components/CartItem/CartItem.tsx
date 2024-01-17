import React from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/store/hook';
import { useTranslation } from 'next-i18next';
import { addProduct, decreaseProduct, delProduct } from '@/features/cart/cartSlice';
import { ICart } from '@/types';
import { apiUrl } from '@/constants';
import cls from '@/styles/_cart.module.scss';

interface Props {
  item: ICart;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('cart');
  return (
    <tr key={item.product._id}>
      <td className={cls.productInfo}>
        <div style={{ position: 'relative' }}>
          <Image
            style={{ width: 'auto', height: 'auto' }}
            width={100}
            height={100}
            priority
            quality={80}
            className={cls.img}
            src={apiUrl + '/' + item.product.image}
            alt={item.product.title}
          />
        </div>
        <div>
          <div className={cls.name}>{item.product.title}</div>
          <div className={cls.delete} onClick={() => dispatch(delProduct(item.product._id))}>
            {t('DeleteFromCart')}
          </div>
        </div>
      </td>
      <td>
        <div className={cls.amount}>
          {item.amount > 1 && (
            <button
              className={cls.amount_btn}
              onClick={() => dispatch(decreaseProduct(item.product._id))}
            >
              -
            </button>
          )}
          <span>{item.amount}</span>
          <button className={cls.amount_btn} onClick={() => dispatch(addProduct(item.product))}>
            +
          </button>
        </div>
      </td>
      <td className={cls.price}>{item.product.actualPrice} KGS</td>
      <td className={cls.cost}>{item.product.actualPrice * item.amount} KGS</td>
      <td className={cls.deleteMobileContainer}>
        <div
          className={cls.deleteMobile}
          onClick={() => dispatch(delProduct(item.product._id))}
        ></div>
      </td>
    </tr>
  );
};

export default CartItem;
