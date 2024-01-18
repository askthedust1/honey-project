import React, { ReactNode } from 'react';
import Header from '@/components/UI/header/Header';
import Footer from '@/components/UI/footer/Footer';
import WhatsApp from '@/components/WhatsApp/WhatsApp';
import cls from '../../../styles/_layoutClient.module.scss';

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className={cls.feet}>
      <div className={cls.background_header}>
        <div className={cls.container}>
          <Header />
        </div>
      </div>
      <div className={cls.background_content}>
        <div className={cls.container}>{children}</div>
      </div>
      <div className={cls.background_footer}>
        <div className={cls.container}>
          <Footer />
        </div>
      </div>
      <WhatsApp />
    </div>
  );
};

export default ClientLayout;
