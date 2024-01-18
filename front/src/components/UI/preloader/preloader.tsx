import React from 'react';
import cls from '@/styles/_preloader.module.scss';

const Preloader = () => {
  return (
    <div className={cls.loader_wrapper}>
      <div className={`${cls.loader} ${cls.loader_dot1}`}></div>
      <div className={`${cls.loader} ${cls.loader_dot2}`}></div>
      <div className={`${cls.loader} ${cls.loader_dot3}`}></div>
    </div>
  );
};

export default Preloader;
