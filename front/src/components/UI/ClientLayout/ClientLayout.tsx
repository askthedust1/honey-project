import React, { ReactNode } from 'react';
import Header from '@/components/UI/header/Header';
import Footer from '@/components/UI/footer/Footer';
import cls from '../../../styles/_layoutClient.module.scss';

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className={cls.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
