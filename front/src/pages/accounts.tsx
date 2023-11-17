import React, { useRef, useState } from 'react';
import Login from '@/components/reg&logForms/Login';
import Register from '@/components/reg&logForms/Register';
import acc from '@/components/reg&logForms/accounts.module.scss';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Accounts = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  let container = useRef<HTMLDivElement | null>(null);
  let currentRef = useRef<HTMLDivElement | null>(null);
  let rightSideRef = useRef<HTMLDivElement | null>(null);

  if (isLoginActive) {
    rightSideRef.current?.classList.add(acc.right);
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

  const current = isLoginActive ? (
    <>
      <p>У вас еще нет аккаунта?</p>
      <br />
      <button
        style={{
          background: 'white',
          border: 'none',
          borderRadius: '10px',
          color: 'orange',
          padding: '10px',
          fontSize: '15px',
        }}
      >
        Зарегистрироваться
      </button>
    </>
  ) : (
    <div style={{ paddingLeft: '10px' }}>
      <p>У вас уже есть аккаунт?</p>
      <br />
      <button
        style={{
          background: 'white',
          border: 'none',
          borderRadius: '10px',
          color: 'orange',
          padding: '10px',
          fontSize: '15px',
        }}
      >
        Войти
      </button>
    </div>
  );
  const currentActive = isLoginActive ? 'login' : 'register';

  return (
    <div className={acc.App}>
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', ['header', 'footer'])),
    },
  };
});

export default Accounts;
