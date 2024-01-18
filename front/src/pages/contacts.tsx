import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosApi from '@/axiosApi';
import { wrapper } from '@/store/store';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { MyPage } from '@/components/common/types';
import GoogleMap from '@/components/GoogleMap/GoogleMap';
import { googleMapEmbed } from '@/constants';
import shop from '@/assets/images/shop_honey.jpeg';
import cls from '../styles/_contacts.module.scss';

const Contacts: MyPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className={cls.contacts}>
      <div>
        <Head>
          <title>{t('contacts')}</title>
          <meta name="description" content="Контактная информация" />
          <meta name="keywords" content="номер телефона дома меда, email, адрес дома меда," />
        </Head>
      </div>
      <div className={cls.row}>
        <div className={cls.col_50}>
          <div className={cls.contacts_media}>
            <Image
              src={shop.src}
              alt={'Shop Picture'}
              width="0"
              height="0"
              sizes="100vw"
              priority
              style={{ width: '100%', height: 'auto' }}
              quality={100}
            />
          </div>
        </div>
        <div className={cls.col_50}>
          <h1 className={cls.contacts_title}>{t('contacts')}</h1>
          <div className={cls.contacts_info}>
            <div className={cls.contacts_info_marker}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                width="23px"
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <Link
                href={'https://2gis.kg/bishkek/firm/70000001043816632'}
                className={cls.contacts_contact}
              >
                г. Бишкек, ул. Матросова, 99{' '}
              </Link>
            </div>
            <div className={cls.contacts_info_marker}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                width="23px"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <Link
                href="tel:+996700505405"
                className={`${cls.contacts_contact} ${cls.contacts_phone}`}
              >
                +996 700 505 405
              </Link>
            </div>
            <div className={cls.contacts_info_marker}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                width="23px"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <Link
                href="mailto:infokyrgyzstanhoney@gmail.com"
                className={`${cls.contacts_contact} ${cls.contacts_mail}`}
              >
                infokyrgyzstanhoney@gmail.com
              </Link>
            </div>
            <div className={cls.contacts_info_marker}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23px"
                fill="currentColor"
                className="bi bi-whatsapp"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                  fill="#3ddb40"
                />
              </svg>
              <Link
                href="https://wa.me/996553355777"
                className={`${cls.contacts_contact} ${cls.contacts_whatsapp}`}
              >
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={cls.contacts_mapWrapper}>
        <h1 className={cls.contacts_subtitle}>Наш магазин на карте:</h1>
        <GoogleMap src={googleMapEmbed} />
      </div>
    </div>
  );
};

Contacts.Layout = 'Main';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'header', 'footer'])),
    },
  };
});

export default Contacts;
