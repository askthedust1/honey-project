import React, { memo } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectAllProducts } from '@/features/products/productsSlice';
import ProductItem from '@/features/products/components/ProductItem';
import { IProduct } from '@/types';
import { useTranslation } from 'next-i18next';

const ProductsAll = () => {
  const products = useAppSelector(selectAllProducts);
  const { t } = useTranslation('common');
  return (
    <div>
      <h2 className="all-products-title">{t('all-products')}</h2>
      <div className="cards-list">
        {products.map((el: IProduct) => (
          <ProductItem
            key={el._id}
            _id={el._id}
            title={el.title}
            price={el.price}
            image={el.image}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ProductsAll);
