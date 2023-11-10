import React from 'react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useAppSelector } from '@/store/hook';
import { wrapper } from '@/store/store';
import { getProduct } from '@/features/products/productsThunk';
import { selectOneProduct } from '@/features/products/productsSlice';
import { apiUrl } from '@/constants';
import cls from './product.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Product: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const product = useAppSelector(selectOneProduct);
  const { t } = useTranslation('common');

  const availableClass =
    product && product.amount > 0
      ? cls.product_info_marker_available
      : cls.product_info_marker_unavailable;
  return (
    <div className={cls.product}>
      <div className={cls.container}>
        <div className={cls.row}>
          <div className={cls.col_50}>
            <div className={cls.product_media}>
              <img
                src={apiUrl + '/' + product?.image}
                className={cls.product_media_wrapper}
                alt={product?.title}
              />
            </div>
          </div>
          <div className={cls.col_50}>
            <div className={cls.product_info}>
              <span className={cls.product_info_category}>{product?.category.title}</span>
              <h1 className={cls.product_info_title}>{product?.title}</h1>

              <div className={`${cls.product_info_marker} ${availableClass}`}>
                {product && product.amount > 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="20px"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="20px"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}

                <span className={cls.product_info_marker_label}>
                  {product && product.amount > 0 ? t('available') : t('unavailable')}
                </span>
              </div>

              <p className={cls.product_info_description}>{product?.description}</p>
              <h3 className={cls.product_info_price}>
                {product?.price} {t('som')}
              </h3>

              {product && product.amount > 0 && (
                <div className={cls.product_btns}>
                  <button type="button" className="btn-primary">
                    {t('add-to-basket')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, params }) => {
      const id = params?.id;
      if (!id || Array.isArray(id)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(getProduct(id));
      return {
        props: {
          ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
        },
      };
    },
);

export default Product;
