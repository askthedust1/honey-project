import React, { memo } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectAllProducts } from '@/features/products/productsSlice';
import ProductItem from '@/features/products/components/ProductItem';
import { IProduct } from '@/types';
import { useTranslation } from 'next-i18next';
import cls from '../../styles/_products.module.scss';
import SideBar from '@/components/UI/sideBar/SideBar';
import bnr from '@/assets/images/prodBannner.png';

interface Props {
  pageName?: string;
}

const ProductsAll: React.FC<Props> = ({ pageName }) => {
  const products = useAppSelector(selectAllProducts);
  const { t } = useTranslation('common');

  return (
    <div className={cls.container}>
      <SideBar />
      <div className={cls.box}>
        <div className={cls.content}>
          <img className={cls.bnr} src={bnr.src} alt="prod" />
          <h2 className={cls.titleBnr}>{pageName ? pageName : t('products')}</h2>
        </div>
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
