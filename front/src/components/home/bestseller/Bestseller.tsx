import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  selectActiveBestsellers,
  selectBestsellers,
  setActiveBestseller,
} from '@/features/products/productsSlice';
import { fetchBestsellers } from '@/features/products/productsThunk';
import ProductItem from '@/components/ProductsAll/ProductItem';
import { IProduct } from '@/types';
import cls from '../../../styles/_bestseller.module.scss';
import otherCls from '../../../styles/_products.module.scss';

const Bestseller = () => {
  const { t, i18n } = useTranslation('home');
  const bestsellers = useAppSelector(selectBestsellers);
  const activeBestseller = useAppSelector(selectActiveBestsellers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBestsellers({ type: activeBestseller, locale: i18n.language }));
  }, [activeBestseller, dispatch, i18n.language]);

  const switchBestseller = (query: string) => {
    dispatch(setActiveBestseller(query));
  };
  return (
    <div className={cls.bestseller}>
      <h2 className={cls.bestseller_title}>{t('bestsellerTitle')}</h2>
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
        <button
          onClick={() => switchBestseller('offers')}
          className={`${cls.bestseller_btn} ${
            activeBestseller === 'offers' && cls.bestseller_btn_active
          }`}
        >
          {t('offers')}
        </button>
      </div>
      <div className={cls.list}>
        {!!bestsellers.length ? (
          bestsellers.map((el: IProduct) => (
            <ProductItem key={el._id} product={el} customClass={otherCls.card_block_white} />
          ))
        ) : (
          <h3>В этом разделе товары временно отсутствуют...</h3>
        )}
      </div>
    </div>
  );
};

export default Bestseller;
