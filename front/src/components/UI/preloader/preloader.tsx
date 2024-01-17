import React from 'react';
import cls from '@/styles/_preloader.module.scss';

const Preloader = () => {
  return (
    <tbody className={cls.loader_wrapper}>
      <tr className={cls.loader}></tr>
    </tbody>
  );
};

export default Preloader;
