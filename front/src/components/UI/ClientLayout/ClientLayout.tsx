import React, { ReactNode } from 'react';
import Header from '@/components/UI/header/Header';
import Footer from '@/components/UI/footer/Footer';
import cls from '../../../styles/_layoutClient.module.scss';

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className={cls.background_header}>
        <div className={cls.container}>
          <Header />
        </div>
      </div>
      <div className={cls.container}>{children}</div>
      <div className={cls.background_footer}>
        <div className={cls.container}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
