import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import axiosApi from '@/axiosApi';
import { wrapper } from '@/store/store';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import Accordion from '@/components/UI/Accordion/Accordion';
import { MyPage } from '@/components/common/types';
import pic from '@/assets/images/faq.png';
import cls from '@/styles/_accordion.module.scss';

const FaqPage: MyPage = () => {
  const { t } = useTranslation('common');

  const accordionData = [
    {
      title: t('faq1'),
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`,
    },
    {
      title: t('faq2'),
      content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
      reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
      quaerat iure quos dolorum accusantium ducimus in illum vero commodi
      pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
      quidem maiores doloremque est numquam praesentium eos voluptatem amet!
      Repudiandae, mollitia id reprehenderit a ab odit!`,
    },
    {
      title: t('faq3'),
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
    {
      title: t('faq4'),
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
    {
      title: t('faq5'),
      content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
    },
  ];

  return (
    <div className={cls.box}>
      <Head>
        <title>{t('faq')}</title>
        <meta name="description" content="Ответы на вопросы" />
        <meta name="keywords" content="мёд, мед бишкек, Мед купить" />
      </Head>
      <h1 className={cls.title}>{t('faq')}</h1>
      <div className={cls.wrap}>
        <div className={cls.img}>
          <Image
            src={pic}
            alt="faq"
            priority
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '85%', height: 'auto' }}
          />
        </div>
        <div className={cls.accordion}>
          {accordionData.map((item, index) => (
            <Accordion item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

FaqPage.Layout = 'Main';

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

export default FaqPage;
