import React, { useEffect } from 'react';
import cls from '../../../styles/_bestseller.module.scss';
import { useTranslation } from 'next-i18next';
import { IProduct } from '@/types';
import ProductItem from '@/features/products/components/ProductItem';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  selectActiveBestsellers,
  selectBestsellers,
  setActiveBestseller,
} from '@/features/products/productsSlice';
import { fetchBestsellers } from '@/features/products/productsThunk';

const Bestseller = () => {
  const { t, i18n } = useTranslation('home');
  const bestsellers = useAppSelector(selectBestsellers);
  const activeBestseller = useAppSelector(selectActiveBestsellers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBestsellers({ type: activeBestseller, locale: i18n.language }));
  }, [activeBestseller, dispatch]);

  const switchBestseller = (query: string) => {
    dispatch(setActiveBestseller(query));
  };
  return (
    <div className={cls.bestseller}>
      <h2 className={cls.bestseller_container}>{t('bestsellerTitle')}</h2>
        <div className={cls.bestseller_btns}>
          <button
            onClick={() => switchBestseller('hit')}
            className={`${cls.bestseller_btn} ${
              activeBestseller === 'hit' && cls.bestseller_btn_active
            }`}
          >
            {t('bestsellerBtn1')}
          </button>
          <button
            onClick={() => switchBestseller('new')}
            className={`${cls.bestseller_btn} ${
              activeBestseller === 'new' && cls.bestseller_btn_active
            }`}
          >
            {t('bestsellerBtn2')}
          </button>
        </div>
        <div className={cls.list}>
          {bestsellers.map((el: IProduct) => (
            <ProductItem key={el._id} product={el} />
          ))}
        </div>
    </div>
  );
};

export default Bestseller;
