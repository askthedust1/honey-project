import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hook';
import { selectCurrentPage, selectTotalPages } from '@/features/products/productsSlice';
import cls from '../../../styles/_pagination.module.scss';

interface Props {
  productsActive: boolean;
  categoriesActive: boolean;
  idCategory?: string;
  sort?: string;
  promotion?: string;
  search?: string;
}

interface Path {
  pathname: string;
  query: { sort?: string } | { promotion: string } | { q: string } | null;
}

const Pagination: React.FC<Props> = (props) => {
  const currentPageState = useAppSelector(selectCurrentPage);
  const totalPageState = useAppSelector(selectTotalPages);

  let objPath1: Path = {
    pathname:
      '/products/page/' +
      (currentPageState > 1 ? currentPageState - 1 : currentPageState).toString(),
    query: null,
  };

  let objPath2: Path = {
    pathname:
      '/products/page/' +
      (currentPageState === totalPageState ? totalPageState : currentPageState + 1).toString(),
    query: null,
  };

  if (props.sort && props.productsActive) {
    objPath1 = {
      pathname:
        '/products/page/' +
        (currentPageState > 1 ? currentPageState - 1 : currentPageState).toString(),
      query: { sort: props.sort },
    };
    objPath2 = {
      pathname:
        '/products/page/' +
        (currentPageState === totalPageState ? totalPageState : currentPageState + 1).toString(),
      query: { sort: props.sort },
    };
  }

  if (props.search) {
    objPath1 = {
      pathname:
        '/products/page/' +
        (currentPageState > 1 ? currentPageState - 1 : currentPageState).toString(),
      query: { q: props.search },
    };
    objPath2 = {
      pathname:
        '/products/page/' +
        (currentPageState === totalPageState ? totalPageState : currentPageState + 1).toString(),
      query: { q: props.search },
    };
  }

  if (props.promotion && props.productsActive) {
    objPath1 = {
      pathname:
        '/products/page/' +
        (currentPageState > 1 ? currentPageState - 1 : currentPageState).toString(),
      query: { promotion: props.promotion },
    };
    objPath2 = {
      pathname:
        '/products/page/' +
        (currentPageState === totalPageState ? totalPageState : currentPageState + 1).toString(),
      query: { promotion: props.promotion },
    };
  }

  const productsTsx = (
    <>
      {currentPageState > 1 ? (
        <div className={cls.circle_left}>
          <Link className={cls.previous} href={objPath1}>
            &#8249;
          </Link>
        </div>
      ) : (
        <div className={cls.circle_transparent}>
          <span className={cls.span_text}>&#8249;</span>
        </div>
      )}

      <div className={cls.circle}>
        <div className="inner-circle">
          {currentPageState} / {totalPageState}
        </div>
      </div>

      {currentPageState === totalPageState ? (
        <div className={cls.circle_transparent}>
          <span className={cls.span_text}>&#8250;</span>
        </div>
      ) : (
        <div className={cls.circle_right}>
          <Link className={cls.next} href={objPath2}>
            &#8250;
          </Link>
        </div>
      )}
    </>
  );

  const categoryTsx = (
    <>
      {currentPageState > 1 ? (
        <div className={cls.circle_left}>
          <Link
            className={cls.previous}
            href={{
              pathname: '/category/page/path',
              query: {
                cId: props.idCategory,
                cPage: (currentPageState > 1 ? currentPageState - 1 : currentPageState).toString(),
                sort: props.sort && props.categoriesActive ? props.sort : null,
              },
            }}
          >
            &#8249;
          </Link>
        </div>
      ) : (
        <div className={cls.circle_transparent}>
          <span className={cls.span_text}>&#8249;</span>
        </div>
      )}

      <div className={cls.circle}>
        <div className="inner-circle">
          {currentPageState} / {totalPageState}
        </div>
      </div>

      {currentPageState === totalPageState ? (
        <div className={cls.circle_transparent}>
          <span className={cls.span_text}>&#8250;</span>
        </div>
      ) : (
        <div className={cls.circle_right}>
          <Link
            className={cls.next}
            href={{
              pathname: '/category/page/path',
              query: {
                cId: props.idCategory,
                cPage: (currentPageState === totalPageState
                  ? totalPageState
                  : currentPageState + 1
                ).toString(),
                sort: props.sort && props.categoriesActive ? props.sort : null,
              },
            }}
          >
            &#8250;
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div className={cls.pagination_block}>
      <div className={cls.pagination_inner}>
        <div className={cls.pagination_inner}>
          {props.productsActive ? productsTsx : ''}
          {props.categoriesActive ? categoryTsx : ''}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
