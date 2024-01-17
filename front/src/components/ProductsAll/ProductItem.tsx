import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { addProduct, delProduct, selectCart } from '@/features/cart/cartSlice';
import { motion } from 'framer-motion';
import { apiUrl } from '@/constants';
import { AnimationState, IProduct } from '@/types';
import cls from '../../styles/_products.module.scss';

interface Props {
  product: IProduct;
  customClass?: string;
  item?: { hidden: AnimationState; visible: AnimationState };
}

const ProductItem: React.FC<Props> = ({ product, customClass, item }) => {
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
    <motion.div variants={item} className={`${cls.card_block} ${customClass}`}>
      <Link href={`/products/${product._id}`} data-product-id={product._id}>
        <div className={cls.card}>
          <div className={cls.imgContainer}>
            <Image
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={80}
              fill
              className={cls.cardImg}
              src={picture}
              alt={product.title}
            />
          </div>
          <div className={cls.info}>
            <h3 className={cls.title}>
              <span>{product.title}</span>
            </h3>
            {product.oldPrice !== product.actualPrice ? (
              <div className={cls.price}>
                <p className={cls.price_oldPrice}>
                  {product.oldPrice} {t('som')}
                </p>
                <p className={cls.price_actualPrice}>
                  {product.actualPrice} {t('som')}
                </p>
              </div>
            ) : (
              <p className={cls.price_actualPrice}>
                {product.actualPrice} {t('som')}
              </p>
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
    </motion.div>
  );
};

export default ProductItem;
