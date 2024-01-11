import React from 'react';
import cls from '@/styles/_loading.module.scss';

const Loading = () => {
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

export default Loading;
