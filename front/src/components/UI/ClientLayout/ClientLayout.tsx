import React, { ReactNode } from 'react';
import Header from '@/components/UI/header/Header';
import Footer from '@/components/UI/footer/Footer';

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
