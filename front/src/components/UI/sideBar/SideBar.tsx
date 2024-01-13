import React, { useState, useEffect } from 'react';
import cls from '../../../styles/_sideBar.module.scss';
import { useAppSelector } from '@/store/hook';
import { selectCategories } from '@/features/categories/categoriesSlice';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const SideBar = () => {
  const categories = useAppSelector(selectCategories);
  const { t } = useTranslation('common');
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 599) {
        setIsCategoriesVisible(true);
      } else {
        setIsCategoriesVisible(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cls.sideBar}>
      <div>
        <h3 className={cls.sideBar_title}>{t('sideBarTitle')}:</h3>
        <button
          className={cls.sideBar_toggleButton}
          onClick={() => setIsCategoriesVisible(!isCategoriesVisible)}
        >
          {isCategoriesVisible ? <span>&#9652;</span> : <span>&#9662;</span>}
        </button>
      </div>
      <div className={`${cls.sideBar_list} ${!isCategoriesVisible ? cls.hiddenCategories : ''}`}>
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
            className={cls.category_item}
          >
            {item.title}
          </Link>
        ))}
        <Link
          className={cls.category_item}
          href={{
            pathname: '/products/page/1',
            query: { promotion: 'promotion' },
          }}
        >
          {t('promotion')}
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
