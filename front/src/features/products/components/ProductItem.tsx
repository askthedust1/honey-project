import React from 'react';
import { apiUrl } from '@/constants';
import Link from 'next/link';
import cls from '../../../styles/products.module.scss';
import { useAppDispatch } from '@/store/hook';
import { IProduct } from '@/types';
import { addProduct } from '@/features/cart/cartSlice';
import { useTranslation } from 'next-i18next';

const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('common');

  const addToCart = () => {
    dispatch(addProduct(product));
  };

  const picture = apiUrl + '/' + product.image;

  return (
    <div className={cls.card_block}>
      <Link href={'/products/' + product._id}>
        <div className={cls.card}>
          <div className={cls.imgContainer}>
            <img className={cls.cardImg} src={picture} alt={product.title} />
          </div>
          <div className={cls.content}>
            <h3 className={cls.title}>{product.title}</h3>
            <p className={cls.price}>{product.actualPrice} сом</p>
          </div>
        </div>
      </Link>
      <div className={cls.btn_block}>
        <button onClick={addToCart} type="button" className={cls.btn_prod}>
          {t('add-to-basket')}
        </button>
      </div>
    </div>
  );
};

interface Props {
  product: IProduct;
}

export default ProductItem;
