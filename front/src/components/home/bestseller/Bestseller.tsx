import React from 'react';
import cls from '../../../styles/_bestseller.module.scss';
import { useTranslation } from 'next-i18next';
import { IProduct } from '@/types';
import ProductItem from '@/features/products/components/ProductItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectBestsellers } from '@/features/products/productsSlice';
import { fetchBestsellers } from '@/features/products/productsThunk';

const Bestseller = () => {
  const { t } = useTranslation('home');
  const bestsellers = useAppSelector(selectBestsellers);
  const dispatch = useAppDispatch();

  const getBest = (query: string) => {
    dispatch(fetchBestsellers(query));
  };
  return (
    <div className={cls.bestseller}>
      <div className={cls.bestseller_container}>
        <div className={cls.bestseller_btns}>
          <button onClick={() => getBest('hit')} className={cls.bestseller_btns_btn1}>
            {t('bestsellerBtn1')}
          </button>
          <button onClick={() => getBest('new')} className={cls.bestseller_btns_btn2}>
            {t('bestsellerBtn2')}
          </button>
        </div>
        <div className={cls.list}>
          {bestsellers.map((el: IProduct) => (
            <ProductItem key={el._id} product={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bestseller;
