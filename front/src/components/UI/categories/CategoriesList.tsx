import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hook';
import { selectCategories } from '@/features/categories/categoriesSlice';
import { apiUrl } from '@/constants';
import cls from '@/styles/_categoriesList.module.scss';

const CatalogCategories = () => {
  const categories = useAppSelector(selectCategories);
  const { t } = useTranslation('home');

  return (
    <div className={cls.catalog}>
      <span className={cls.topLineBg}></span>
      <div className={cls.catalog_container}>
        <h3>{t('catalogTitle')}</h3>
        <p>{t('catalogText')}</p>
        <div className={cls.catalog_list}>
          <span className={cls.bgLeft}></span>
          {!!categories.length ? (
            categories.map((item) => (
              <Link
                href={{
                  pathname: 'category/page/path',
                  query: { cId: item._id, cPage: '1' },
                }}
                key={item._id}
                className={cls.catalog_list_item}
              >
                <Image
                  className={cls.catalog_list_item_img}
                  src={apiUrl + '/' + item.image}
                  alt={item.title}
                  priority
                  width={315}
                  height={168}
                />
                <span>{item.title}</span>
              </Link>
            ))
          ) : (
            <h3 style={{ fontSize: '24px' }}>Каталог временно пуст...</h3>
          )}
          <span className={cls.bgRight}></span>
        </div>
      </div>
      <span className={cls.bottomLineBg}></span>
    </div>
  );
};

export default CatalogCategories;
