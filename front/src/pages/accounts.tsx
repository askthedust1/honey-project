import React, { useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosApi from '@/axiosApi';
import { wrapper } from '@/store/store';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import Register from '@/components/reg&logForms/Register';
import Login from '@/components/reg&logForms/Login';
import { MyPage } from '@/components/common/types';
import acc from '@/styles/_accounts.module.scss';

const Accounts: MyPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const { t } = useTranslation('account');
  let container = useRef<HTMLDivElement | null>(null);
  let currentRef = useRef<HTMLDivElement | null>(null);
  let rightSideRef = useRef<HTMLDivElement | null>(null);

  if (isLoginActive) {
    rightSideRef.current?.classList.add(acc.right);
    rightSideRef.current?.classList.add(acc.logMobile);
  }

  const changeState = () => {
    if (isLoginActive) {
      rightSideRef.current?.classList.remove(acc.right);
      rightSideRef.current?.classList.add(acc.left);
    } else {
      rightSideRef.current?.classList.remove(acc.left);
      rightSideRef.current?.classList.add(acc.right);
    }
    setIsLoginActive(!isLoginActive);
  };

  const changeStateMobile = () => {
    if (isLoginActive) {
      rightSideRef.current?.classList.remove(acc.logMobile);
      rightSideRef.current?.classList.add(acc.regMobile);
    } else {
      rightSideRef.current?.classList.remove(acc.regMobile);
      rightSideRef.current?.classList.add(acc.logMobile);
    }
    setIsLoginActive(!isLoginActive);
  };

  const current = isLoginActive ? (
    <div className={acc.wrapBtn}>
      <p>{t('accReg')}</p>
      <br />
      <button data-acc-id={'button-reg'} className={acc.btnOn}>
        {t('register')}
      </button>
    </div>
  ) : (
    <div className={acc.wrapBtn}>
      <p>{t('acc')}</p>
      <br />
      <button id={'button-log'} className={acc.btnOn}>
        {t('login')}
      </button>
    </div>
  );
  const currentActive = isLoginActive ? 'login' : 'register';

  return (
    <div className={acc.App}>
      <div>
        <Head>
          <title>{t('title')}</title>
          <meta name="description" content="Описание страницы" />
        </Head>
      </div>
      <Mobile
        current={current}
        currentActive={currentActive}
        containerRef={rightSideRef}
        onClick={changeStateMobile}
        isLog={isLoginActive}
      />
      <div className={acc.login}>
        <div className={acc.container} ref={container}>
          {isLoginActive && <Login containerRef={currentRef} />}
          {!isLoginActive && <Register containerRef={currentRef} />}
        </div>
        <RightSide
          current={current}
          currentActive={currentActive}
          containerRef={rightSideRef}
          onClick={changeState}
          isLog={isLoginActive}
        />
      </div>
    </div>
  );
};

interface RightSideProps {
  current: string | React.JSX.Element;
  currentActive: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onClick: () => void;
  isLog: boolean;
}

const RightSide: React.FC<RightSideProps> = (props) => {
  return (
    <div
      className={props.isLog ? acc.rightSide + ' ' + acc.right : acc.rightSide + ' ' + acc.left}
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className={acc.innerContainer}>
        <div className={acc.text}>{props.current}</div>
      </div>
    </div>
  );
};

const Mobile: React.FC<RightSideProps> = (props) => {
  return (
    <div
      className={props.isLog ? acc.logMobile : acc.regMobile}
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className={acc.innerContainer}>
        <div className={acc.text}>{props.current}</div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const lang = locale ?? 'ru';
  axiosApi.defaults.headers.common['Accept-Language'] = lang;

  await store.dispatch(fetchCategories(lang));
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer', 'account'])),
    },
  };
});

Accounts.Layout = 'Main';

export default Accounts;
