import React from 'react';
import HomeOpener from '@/components/home/homeOpener/HomeOpener';
import cls from '../../styles/_homePage.module.scss';

const HomePage = () => {
  return (
    <div className={cls.home}>
      <HomeOpener />
    </div>
  );
};

export default HomePage;
