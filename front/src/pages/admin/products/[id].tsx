import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { fetchOneProductForAdmin } from '@/features/productAdmin/productsAdminThunk';
import { selectOneProductForAdmin } from '@/features/productAdmin/productsAdminSlice';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';
import cls from '../../../styles/_adminOneProduct.module.scss';

const ProductInfo: MyPage = () => {
  const { id } = useParams() || {};
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProductForAdmin);

  useEffect(() => {
    if (id) {
      if (typeof id === 'string') {
        dispatch(fetchOneProductForAdmin(id));
      }
    }
  }, [dispatch, id]);
  return (
    <ProtectedRoute>
      {product && (
        <div className={cls.productsContainer}>
          <Head>
            <title>{product.translations.ru.title}</title>
          </Head>
          <Link className={cls.back} href={`/admin/products/`}>
            Назад
          </Link>
          <h2>Информация о продукте</h2>
          <div className={cls.productInfoBlock}>
            <div style={{ position: 'relative' }} className={cls.photoBlock}>
              <Image
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                quality={80}
                fill
                src={apiUrl + '/' + product.image}
                alt="image"
              />
            </div>

            <div className={cls.infoBlock}>
              <div className={cls.productsName}>
                <h3>Название:</h3>
                <div className={cls.name}>
                  <span className={cls.spanLang}>RU</span>
                  <span>{product.translations.ru.title}</span>
                </div>
                <div className={cls.name}>
                  <span className={cls.spanLang}>EN</span>
                  <span>{product.translations.en.title}</span>
                </div>
                <div className={cls.name}>
                  <span className={cls.spanLang}>KG</span>
                  <span>{product.translations.kg.title}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cls.bottomBlock}>
            <div className={cls.detailsBlock}>
              <div className={cls.descriptionBlock}>
                <h3>Описание продукта:</h3>
                <div className={cls.description}>
                  <span className={cls.spanLang}>RU</span>
                  <span>{product.translations.ru.description}</span>
                </div>
                <div className={cls.description}>
                  <span className={cls.spanLang}>EN</span>
                  <span>{product.translations.en.description}</span>
                </div>
                <div className={cls.description}>
                  <span className={cls.spanLang}>KG</span>
                  <span>{product.translations.kg.description}</span>
                </div>
              </div>
            </div>
            <div className={cls.moreBlock}>
              <h3>Детали:</h3>
              <div>
                <p>
                  <span>Категория:</span> {product.category.translations.ru.title}
                </p>
                <p>
                  <span>Старая цена:</span> {product.oldPrice} сом
                </p>
                <p>
                  <span>Новая цена:</span> {product.actualPrice} сом
                </p>
                <p>
                  <span>Количество товара:</span> {product.amount}
                </p>
                <p>
                  <span>Дата создания: </span> {new Date(product.datetime).toLocaleDateString()}
                </p>
                <p>
                  <span>Статус: </span>
                  {product.isActive ? (
                    <button className={cls.btnActive}>Активен</button>
                  ) : (
                    <button className={cls.btnInactive}>Неактивен</button>
                  )}
                </p>
                <p>
                  <span>Хит: </span>
                  {product.isHit ? (
                    <button className={cls.btnActive}>Активен</button>
                  ) : (
                    <button className={cls.btnInactive}>Неактивен</button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};
ProductInfo.Layout = 'Admin';

export default ProductInfo;
