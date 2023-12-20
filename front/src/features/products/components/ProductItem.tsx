import React from 'react';
import { apiUrl } from '@/constants';
import Link from 'next/link';
import cls from '../../../styles/_products.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { IProduct } from '@/types';
import { addProduct, delProduct, selectCart } from '@/features/cart/cartSlice';
import { useTranslation } from 'next-i18next';

interface Props {
  product: IProduct;
  customClass?: string;
}

const ProductItem: React.FC<Props> = ({ product, customClass }) => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector(selectCart);
  const { t } = useTranslation('common');
  const picture = apiUrl + '/' + product.image;
  const isInCart = cartState.some((unit) => product._id === unit.product._id);

  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(delProduct(product._id));
    } else {
      dispatch(addProduct(product));
    }
  };

  return (
    <div className={`${cls.card_block} ${customClass}`}>
      <Link href={`/products/${product._id}`} data-product-id={product._id}>
        <div className={cls.card}>
          <div className={cls.imgContainer}>
            <img className={cls.cardImg} src={picture} alt={product.title} />
          </div>
          <div className={cls.info}>
            <h3 className={cls.title}>
              <span>{product.title}</span>
            </h3>
            {product.oldPrice !== product.actualPrice ? (
              <div className={cls.price}>
                <p className={cls.price_oldPrice}>{product.oldPrice} сом</p>
                <p className={cls.price_actualPrice}>{product.actualPrice} сом</p>
              </div>
            ) : (
              <p className={cls.price_actualPrice}>{product.actualPrice} сом</p>
            )}
          </div>
        </div>
      </Link>
      <div className={cls.btn_prod}>
        <button
          onClick={handleToggleCart}
          type="button"
          className={isInCart ? cls.btn_block_in_cart : cls.btn_block}
        >
          {isInCart ? t('remove-from-basket') : t('add-to-basket')}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
