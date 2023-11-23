import React from 'react';
import cls from '../../../styles/sideBar.module.scss';
import { useAppSelector } from '@/store/hook';
import { selectCategories } from '@/features/categories/categoriesSlice';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const SideBar = () => {
  const categories = useAppSelector(selectCategories);
  const { t } = useTranslation('common');

  return (
    <div className={cls.sideBar}>
      <h3 className={cls.sideBar_title}>{t('sideBarTitle')}</h3>
      <div className={cls.sideBar_list}>
        {categories.map((item) => (
          <Link
            key={item._id}
            href={{
              pathname: '/category/page/path',
              query: { cId: item._id, cPage: '1' },
            }}
            className={cls.category_item}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
