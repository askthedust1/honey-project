import React from 'react';
import cls from '../../../styles/_loadingBtn.module.scss';

const LoadingSpinnerBtn = () => {
  return (
    <div className={cls.btnLoading}>
      <span className={cls.sp}>
        <b className={cls.b}></b>
        <b className={cls.b}></b>
        <b className={cls.b}></b>
      </span>
    </div>
  );
};

export default LoadingSpinnerBtn;
