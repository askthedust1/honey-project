import React, { useState } from 'react';
import { FacebookShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useTranslation } from 'next-i18next';
import axiosApi from '@/axiosApi';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { getProduct } from '@/features/products/productsThunk';
import { selectOneProduct, selectRelatedProducts } from '@/features/products/productsSlice';
import { addProduct, delProduct, selectCart } from '@/features/cart/cartSlice';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';
import cls from '../../styles/_product.module.scss';
import wrp from '@/styles/_layoutClient.module.scss';

const Product: MyPage = () => {
  const product = useAppSelector(selectOneProduct);
  const products = useAppSelector(selectRelatedProducts);
  const cartState = useAppSelector(selectCart);
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const isInCart = cartState.some((unit) => product?._id === unit.product._id);
  const [copied, setCopied] = useState(false);
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleToggleCart = () => {
    if (isInCart && product) {
      dispatch(delProduct(product._id));
    } else if (product) {
      dispatch(addProduct(product));
    }
  };

  const availableClass =
    product && product.amount > 0
      ? cls.product_info_marker_available
      : cls.product_info_marker_unavailable;

  const imagePath = product?.image ? apiUrl + '/' + product.image : '';
  return (
    <>
      <div>
        <Head>
          <title>{product?.title}</title>
          <meta name="description" content={product?.description} />
          <meta name="keywords" content={product?.title} />
          <meta property="og:title" content={product?.title} />
          <meta property="og:description" content={product?.description} />
          <meta property="og:image" content={product?.image} />
          <meta name="twitter:title" content={product?.title} />
          <meta name="twitter:description" content={product?.description} />
          <meta name="twitter:image" content={product?.image} />
        </Head>
      </div>
      <div className={wrp.container}>
        <div className={cls.product_info_return}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="15px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <Link href={'/products/page/1'} className={cls.product_info_return_link}>
            {t('catalog')}
          </Link>
        </div>
        <div className={cls.product}>
          <div className={cls.row}>
            <div className={cls.col_50}>
              <div className={cls.product_media}>
                <Image
                  width={100}
                  height={100}
                  src={imagePath}
                  className={cls.product_media_wrapper}
                  alt={product ? product.title : 'Продукция Aman Kyrgyz Honey'}
                  layout="responsive"
                  objectFit="cover"
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
                {product?.oldPrice !== product?.actualPrice ? (
                  <div className={cls.product_info_prices}>
                    <h3 className={cls.product_info_oldPrice}>
                      {product?.oldPrice} {t('som')}
                    </h3>
                    <h3 className={cls.product_info_actualPrice}>
                      {product?.actualPrice} {t('som')}
                    </h3>
                  </div>
                ) : (
                  <h3 className={cls.product_info_actualPrice}>
                    {product?.actualPrice} {t('som')}
                  </h3>
                )}

                {product && product.amount > 0 && (
                  <div className={cls.product_btns}>
                    <ButtonUi
                      text={isInCart ? t('remove-from-basket') : t('add-to-basket')}
                      type="button"
                      btn={isInCart ? 'btn_in_cart' : 'btn-primary'}
                      event={() => handleToggleCart()}
                    />
                    <div className={cls.socialBtns}>
                      <FacebookShareButton
                        className={cls.facebook}
                        url={productUrl}
                        windowWidth={800}
                        windowHeight={600}
                      >
                        <span></span>
                      </FacebookShareButton>

                      <TelegramShareButton
                        className={cls.telegram}
                        url={productUrl}
                        title={product?.title}
                        windowWidth={800}
                        windowHeight={600}
                      >
                        <span></span>
                      </TelegramShareButton>

                      <WhatsappShareButton
                        className={cls.whatsapp}
                        url={productUrl}
                        title={product?.title}
                        windowWidth={800}
                        windowHeight={600}
                      >
                        <span></span>
                      </WhatsappShareButton>
                      <button className={cls.copy} onClick={copyToClipboard}></button>
                    </div>
                    {copied && <span>{t('copy')}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={products} />
      </div>
    </>
  );
};

Product.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale, params }) => {
      const lang = locale ?? 'ru';
      axiosApi.defaults.headers.common['Accept-Language'] = lang;
      await store.dispatch(fetchCategories(lang));

      const id = params?.id;
      if (!id || Array.isArray(id)) {
        throw new Error('Param id must be a string');
      }

      await store.dispatch(getProduct({ id: id, locale: lang }));
      return {
        props: {
          ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
        },
      };
    },
);

export default Product;
