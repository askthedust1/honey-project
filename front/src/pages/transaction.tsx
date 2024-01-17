import React from 'react';
import axiosApi from '@/axiosApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from '@/store/store';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { MyPage } from '@/components/common/types';
import Transaction from '@/components/Transaction/Transaction';

const TransactionPage: MyPage = () => {
  return (
    <div style={{ minHeight: '600px' }}>
      <Transaction />
    </div>
  );
};
export default TransactionPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  return {
    props: {
      name: 'Transaction',
      ...(await serverSideTranslations(locale ?? 'ru', ['transaction', 'header', 'footer'])),
    },
  };
});

TransactionPage.Layout = 'Main';
