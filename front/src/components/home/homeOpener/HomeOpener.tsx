import React from 'react';
import cls from './homeOpener.module.scss';
import jar from '@/assets/images/jar-of-honey-with-stick.png';
import { useTranslation } from 'next-i18next';

const HomeOpener = () => {
  const { t } = useTranslation('home');
  return (
    <div className={cls.opener}>
      <div className={cls.opener_item}>
        <h2 className={cls.opener_item_title}>{t('titleOpened')}</h2>
        <p className={cls.opener_item_content}>{t('contentOpened')}</p>
        <button className={cls.opener_item_btn}>{t('btnOpened')}</button>
      </div>
      <img src={jar.src} alt={'jar'} />
    </div>
  );
};

export default HomeOpener;
