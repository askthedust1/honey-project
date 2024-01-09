import React, { useState } from 'react';
import { useAppSelector } from '@/store/hook';
import { selectAllProducts } from '@/features/products/productsSlice';
import ProductItem from '@/features/products/components/ProductItem';
import { IProduct } from '@/types';
import { useTranslation } from 'next-i18next';
import cls from '../../styles/_products.module.scss';
import SideBar from '@/components/UI/sideBar/SideBar';
import bnr from '@/assets/images/prodBannner.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FilterBar from '@/components/FilterBar/FilterBar';

interface Props {
  pageName?: string;
  id?: string;
}

const ProductsAll: React.FC<Props> = ({ pageName, id }) => {
  let title = 'products';
  const router = useRouter();
  if (router.query && router.query.promotion === 'promotion') title = 'promotion';
  const products = useAppSelector(selectAllProducts);
  const { t } = useTranslation('common');

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={cls.container}>
      <div className={cls.content}>
        <Image
          width="0"
          height="0"
          sizes="100vw"
          loading="lazy"
          style={{ width: '100%', height: '230px' }}
          quality={100}
          className={cls.bnr}
          src={bnr}
          alt={'prod'}
        />
        <h2 className={cls.titleBnr}>{pageName ? pageName : t(title)}</h2>
      </div>
      <div className={cls.box}>
        <SideBar />
        <div className={cls.listContaiter}>
          <div className={cls.filterContainer}>
            <FilterBar categoryId={id} />
            <div className={cls.searchContainer}>
              <input
                value={searchQuery}
                onChange={handleSearchInputChange}
                type="text"
                placeholder="Найти по названию"
              />
              <Link
                href={{
                  pathname: '/products/page/path',
                  query: { q: searchQuery, page: '1' },
                }}
              >
                {t('search')}
              </Link>
            </div>
          </div>
          {products.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>Товаров нет</div>
          ) : (
            <div className={cls.list}>
              {products.map((el: IProduct) => (
                <ProductItem key={el._id} product={el} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsAll;
