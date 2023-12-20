import React from 'react';
import cls from '@/components/UI/loader/_loader.module.scss';

const Loader = () => {
  return (
    <div className={cls.loader_wrap}>
      <div className={cls.loader}>
        <div className={cls.dot}></div>
        <div className={cls.dot}></div>
        <div className={cls.dot}></div>
        <div className={cls.dot}></div>
        <div className={cls.dot}></div>
      </div>
    </div>
  );
};

export default Loader;
