import React from 'react';
import cls from '../../../styles/_sideBar.module.scss';
import { useAppSelector } from '@/store/hook';
import { selectCategories } from '@/features/categories/categoriesSlice';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {selectTotalPages} from "@/features/products/productsSlice";

const SideBar = () => {
  const categories = useAppSelector(selectCategories);
  const { t } = useTranslation('common');
  return (
    <div className={cls.sideBar}>
      <div className={cls.sideBar_list}>
        <h3 className={cls.sideBar_title}>{t('sideBarTitle')}:</h3>
        <Link className={cls.category_item} href={'/products/page/1'}>
          {t('all-products')}
        </Link>
        {categories.map((item) => (
          <Link
            key={item._id}
            href={{
              pathname: '/category/page/path',
              query: { cId: item._id, cPage: '1' },
            }}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
