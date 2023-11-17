import React from 'react';
import bee_delivery from '@/assets/images/bee-delivery.png';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cls from '@/styles/delivery.module.scss';
import { useTranslation } from 'next-i18next';

const Delivery = () => {
  const { t } = useTranslation('common');
  return (
    <div className={cls.delivery}>
      <div className={cls.container}>
        <h1 className={cls.delivery_title}>{t('delivery')}</h1>
        <p className={cls.delivery_info}>Тут пока пусто, но есть переход на страницу)</p>
        <div className={cls.delivery_media}>
          <img src={bee_delivery.src} alt="Delivery" />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer'])),
    },
  };
});

export default Delivery;
