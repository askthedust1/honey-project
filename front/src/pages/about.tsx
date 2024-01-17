import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosApi from '@/axiosApi';
import { wrapper } from '@/store/store';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { MyPage } from '@/components/common/types';
import european_bank from '@/assets/images/partners/european_bank.png';
import usaid from '@/assets/images/partners/usaid.png';
import jica from '@/assets/images/partners/jica.png';
import plata_kg from '@/assets/images/partners/plata_kg.png';
import jia from '@/assets/images/partners/jia.png';
import german from '@/assets/images/partners/german.png';
import about2 from '@/assets/images/about2.jpg';
import about1 from '@/assets/images/about1.jpg';
import cls from '../styles/_about.module.scss';

const About: MyPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className={cls.about}>
      <div>
        <Head>
          <title>{t('about')}</title>
          <meta name="description" content="О нас" />
          <meta name="keywords" content="производство меда, мед бишкек, аман мед" />
        </Head>
      </div>
      <div>
        <h1 className={cls.about_title}>{t('about')}</h1>
        <div className={cls.row}>
          <div className={cls.col_50}>
            <div className={cls.about_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={about1.src}
                alt={'About1'}
              />
            </div>
          </div>
          <div className={cls.col_50}>
            <div className={cls.about_info}>
              <h2 className={cls.about_second_title}>Lorem ipsum dolor sit amet</h2>
              <div className={cls.about_svg_wrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="284"
                  height="40"
                  viewBox="0 0 284 40"
                  fill="none"
                >
                  <path
                    d="M181.034 0.697709C160.838 1.32266 140.654 2.37085 120.504 3.84229C102.218 4.16634 83.9294 4.49039 65.6439 4.81443C45.5794 5.17155 25.5149 5.52535 5.45374 5.88247C3.51277 5.91553 0.507061 7.34068 0.209467 9.49328C-0.117887 11.8674 2.81838 12.2642 4.47168 12.2378C17.5096 12.0063 30.5476 11.7748 43.5855 11.5434C38.1594 12.2345 32.7398 12.952 27.3203 13.7026C25.4422 13.9638 22.82 14.8434 22.2215 16.8968C21.6859 18.7286 23.359 20.0281 25.1347 20.0612C55.2446 20.577 85.3579 21.0962 115.468 21.612C121.876 21.7211 128.284 21.8335 134.692 21.9426C125.474 22.9512 116.268 24.1118 107.089 25.4245C92.6952 27.4878 78.3611 29.9347 64.0898 32.7222C62.5489 33.0231 60.3632 34.3722 60.1285 36.1015C59.9003 37.7548 61.7222 38.8361 63.1838 38.8493C97.427 39.1469 131.67 39.4478 165.913 39.7454C175.569 39.8281 185.221 39.914 194.876 39.9967C197.088 40.0165 199.925 39.385 201.039 37.2126C202.035 35.2683 200.17 33.6513 198.269 33.6348C165.305 33.3471 132.341 33.0595 99.3779 32.7718C100.297 32.6329 101.213 32.4907 102.132 32.3551C114.588 30.5101 127.087 28.946 139.613 27.6664C164.677 25.1071 189.853 23.6819 215.046 23.4009C216.161 23.3876 217.288 23.381 218.412 23.3744C231.182 23.5926 243.949 23.8142 256.719 24.0324C258.928 24.0688 261.775 23.4075 262.883 21.2483C263.901 19.2643 261.997 17.7466 260.112 17.6705C247.081 17.1481 234.036 16.9232 220.995 16.9993C203.923 16.705 186.851 16.414 169.779 16.1197C139.669 15.6039 109.556 15.0847 79.4456 14.5689C77.0186 14.5259 74.5882 14.4863 72.1612 14.4433C87.9271 12.7668 103.719 11.3483 119.532 10.1943C152.495 9.60901 185.462 9.02705 218.426 8.44178C238.49 8.08467 258.555 7.73086 278.616 7.37374C280.457 7.34068 283.162 6.07756 283.714 4.17956C284.257 2.32456 282.57 1.08127 280.801 1.01514C247.56 -0.221528 214.279 -0.330646 181.034 0.697709Z"
                    fill="#FFB931"
                  />
                </svg>
              </div>
              <p className={cls.about_info_text}>
                Commodi culpa, cum fugiat ipsam libero minima, odio pariatur quam quo, sed tempore
                voluptate? Debitis excepturi fuga labore possimus quia, vitae? Eveniet fugiat illo
                nesciunt placeat repellendus reprehenderit, voluptate voluptatibus? Accusamus atque
                consectetur consequuntur cupiditate distinctio eos est eveniet explicabo, fugiat
                fugit harum incidunt minima neque nisi nostrum officia perferendis repellat suscipit
                veritatis vitae. Autem dolorem ipsa itaque mollitia necessitatibus.
              </p>
            </div>
          </div>
        </div>
        <div className={cls.about_advantages}>
          <h2 className={cls.about_advantages_title}>{t('about-why')}</h2>
          <div className={cls.about_advantages_row}>
            <div className={cls.about_advantages_col}>
              <div className={cls.about_advantages_card}>
                <div className={cls.about_advantages_card_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width="60px"
                    stroke="currentColor"
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
                </div>
                <h4 className={cls.about_advantages_card_title}>Find property</h4>
                <p className={cls.about_advantages_card_info}>
                  Odales mauris quis tellus facilisis, vel mattis magna interdum. Curabitur eget
                  aliquam elit. In mauris purus, auctor a eleifend non.
                </p>
              </div>
            </div>
            <div className={cls.about_advantages_col}>
              <div className={cls.about_advantages_card}>
                <div className={cls.about_advantages_card_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width="60px"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                </div>
                <h4 className={cls.about_advantages_card_title}>Find property lorem ipsum</h4>
                <p className={cls.about_advantages_card_info}>
                  Odales mauris quis tellus facilisis, vel mattis magna interdum. Curabitur eget
                  aliquam elit.
                </p>
              </div>
            </div>
            <div className={cls.about_advantages_col}>
              <div className={cls.about_advantages_card}>
                <div className={cls.about_advantages_card_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width="60px"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <h4 className={cls.about_advantages_card_title}>Find property lorem ipsum</h4>
                <p className={cls.about_advantages_card_info}>
                  Odales mauris quis tellus facilisis, vel mattis magna interdum. Curabitur eget
                  aliquam elit. In mauris purus, auctor a eleifend non.
                </p>
              </div>
            </div>
            <div className={cls.about_advantages_col}>
              <div className={cls.about_advantages_card}>
                <div className={cls.about_advantages_card_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width="60px"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
                <h4 className={cls.about_advantages_card_title}>Find property</h4>
                <p className={cls.about_advantages_card_info}>
                  Odales mauris quis tellus facilisis, vel mattis magna interdum. Curabitur eget
                  aliquam elit. In mauris purus, auctor a eleifend non.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={cls.row}>
          <div className={cls.col_50}>
            <div className={cls.about_info}>
              <h2 className={cls.about_second_title}>Lorem ipsum dolor sit amet</h2>
              <div className={cls.about_svg_wrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="284"
                  height="40"
                  viewBox="0 0 284 40"
                  fill="none"
                >
                  <path
                    d="M181.034 0.697709C160.838 1.32266 140.654 2.37085 120.504 3.84229C102.218 4.16634 83.9294 4.49039 65.6439 4.81443C45.5794 5.17155 25.5149 5.52535 5.45374 5.88247C3.51277 5.91553 0.507061 7.34068 0.209467 9.49328C-0.117887 11.8674 2.81838 12.2642 4.47168 12.2378C17.5096 12.0063 30.5476 11.7748 43.5855 11.5434C38.1594 12.2345 32.7398 12.952 27.3203 13.7026C25.4422 13.9638 22.82 14.8434 22.2215 16.8968C21.6859 18.7286 23.359 20.0281 25.1347 20.0612C55.2446 20.577 85.3579 21.0962 115.468 21.612C121.876 21.7211 128.284 21.8335 134.692 21.9426C125.474 22.9512 116.268 24.1118 107.089 25.4245C92.6952 27.4878 78.3611 29.9347 64.0898 32.7222C62.5489 33.0231 60.3632 34.3722 60.1285 36.1015C59.9003 37.7548 61.7222 38.8361 63.1838 38.8493C97.427 39.1469 131.67 39.4478 165.913 39.7454C175.569 39.8281 185.221 39.914 194.876 39.9967C197.088 40.0165 199.925 39.385 201.039 37.2126C202.035 35.2683 200.17 33.6513 198.269 33.6348C165.305 33.3471 132.341 33.0595 99.3779 32.7718C100.297 32.6329 101.213 32.4907 102.132 32.3551C114.588 30.5101 127.087 28.946 139.613 27.6664C164.677 25.1071 189.853 23.6819 215.046 23.4009C216.161 23.3876 217.288 23.381 218.412 23.3744C231.182 23.5926 243.949 23.8142 256.719 24.0324C258.928 24.0688 261.775 23.4075 262.883 21.2483C263.901 19.2643 261.997 17.7466 260.112 17.6705C247.081 17.1481 234.036 16.9232 220.995 16.9993C203.923 16.705 186.851 16.414 169.779 16.1197C139.669 15.6039 109.556 15.0847 79.4456 14.5689C77.0186 14.5259 74.5882 14.4863 72.1612 14.4433C87.9271 12.7668 103.719 11.3483 119.532 10.1943C152.495 9.60901 185.462 9.02705 218.426 8.44178C238.49 8.08467 258.555 7.73086 278.616 7.37374C280.457 7.34068 283.162 6.07756 283.714 4.17956C284.257 2.32456 282.57 1.08127 280.801 1.01514C247.56 -0.221528 214.279 -0.330646 181.034 0.697709Z"
                    fill="#FFB931"
                  />
                </svg>
              </div>
              <p className={cls.about_info_text}>
                Commodi culpa, cum fugiat ipsam libero minima, odio pariatur quam quo, sed tempore
                voluptate? Debitis excepturi fuga labore possimus quia, vitae? Eveniet fugiat illo
                nesciunt placeat repellendus reprehenderit, voluptate voluptatibus? Accusamus atque
                consectetur consequuntur cupiditate distinctio eos est eveniet explicabo, fugiat
                fugit harum incidunt minima neque nisi nostrum officia perferendis repellat suscipit
                veritatis vitae. Autem dolorem ipsa itaque mollitia necessitatibus.
              </p>
            </div>
          </div>
          <div className={cls.col_50}>
            <div className={cls.about_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={about2.src}
                alt={'About2'}
              />
            </div>
          </div>
        </div>
        <div className={cls.about_partners}>
          <h3 className={cls.about_advantages_title}>Partners</h3>
          <div className={cls.about_partners_row}>
            <div className={cls.about_partners_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={european_bank.src}
                alt={'About2'}
                className={cls.about_partners_media_img}
              />
            </div>
            <div className={cls.about_partners_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={german.src}
                alt={'About2'}
                className={cls.about_partners_media_img}
              />
            </div>
            <div className={cls.about_partners_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={jica.src}
                alt={'About2'}
                className={cls.about_partners_media_img}
              />
            </div>
            <div className={cls.about_partners_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={jia.src}
                alt={'About2'}
                className={cls.about_partners_media_img}
              />
            </div>
            <div className={cls.about_partners_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={plata_kg.src}
                alt={'About2'}
                className={cls.about_partners_media_img}
              />
            </div>
            <div className={cls.about_partners_media}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ width: '100%', height: 'auto' }}
                quality={100}
                src={usaid.src}
                alt={'About2'}
                className={cls.about_partners_media_img}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

About.Layout = 'Main';

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

export default About;
