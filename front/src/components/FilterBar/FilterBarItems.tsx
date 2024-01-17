import React from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';
import { useTranslation } from 'next-i18next';
import cls from '@/styles/_products.module.scss';

interface Props {
  categoryId?: string;
}

interface FilterLinkProps {
  href: UrlObject;
  text: string;
}

const FilterLink: React.FC<FilterLinkProps> = ({ href, text }) => <Link href={href}>{text}</Link>;

const FilterBarItems: React.FC<Props> = ({ categoryId }) => {
  const { t } = useTranslation('common');
  const basePath = categoryId ? '/category/page/path' : '/products/page/1';
  const baseQuery = categoryId ? { cId: categoryId, cPage: '1' } : {};

  const links = [
    { sort: 'title', text: t('filter1') },
    { sort: 'priceDown', text: t('filter2') },
    { sort: 'priceUp', text: t('filter3') },
  ];

  return (
    <div className={cls.dropdownMenu}>
      {links.map(({ sort, text }) => (
        <FilterLink
          key={sort}
          href={{ pathname: basePath, query: { ...baseQuery, sort } }}
          text={text}
        />
      ))}
    </div>
  );
};

export default FilterBarItems;
