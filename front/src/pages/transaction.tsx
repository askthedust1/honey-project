import React from 'react';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
  return {
    props: {
      name: 'Transaction',
      ...(await serverSideTranslations(locale ?? 'ru', ['transaction', 'header', 'footer'])),
    },
  };
});

TransactionPage.Layout = 'Main';
