import React, { memo } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectAllProducts } from '@/features/products/productsSlice';
import ProductItem from '@/features/products/components/ProductItem';
import { IProduct } from '@/types';
import { useTranslation } from 'next-i18next';
import cls from '../../styles/products.module.scss';
import SideBar from '@/components/UI/sideBar/SideBar';

const ProductsAll = () => {
  const products = useAppSelector(selectAllProducts);
  const { t } = useTranslation('common');

  return (
    <div className={cls.container}>
      <SideBar />
      <div>
        <h2 className={cls.title}>{t('products')}</h2>
        <div className={cls.list}>
          {products.map((el: IProduct) => (
            <ProductItem key={el._id} product={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductsAll);
