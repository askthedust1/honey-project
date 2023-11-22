import React from 'react';
import { apiUrl } from '@/constants';
import Cart from '@/assets/images/cart.svg';
import Link from 'next/link';
import cls from './products.module.scss';
import { useAppDispatch } from '@/store/hook';
import { IProduct } from '@/types';
import { addProduct } from '@/features/cart/cartSlice';

interface Props {
  product: IProduct;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const addToCart = () => {
    dispatch(addProduct(product));
  };

  const picture = apiUrl + '/' + product.image;
  return (
    <Link href={'/products/' + product._id}>
      <div className={cls.card}>
        <div onClick={addToCart} className={cls.imgContainer}>
          <div className={cls.cartIcon}>
            <img src={Cart.src} alt="cart" />
          </div>
          <img className={cls.cardImg} src={picture} alt={product.title} />
        </div>
        <div className={cls.content}>
          <h3 className={cls.title}>{product.title}</h3>
          <p className={cls.price}>{product.actualPrice} сом</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
