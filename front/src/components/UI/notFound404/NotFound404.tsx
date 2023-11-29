import React from 'react';
import cls from './notFound.module.css';
import Link from 'next/link';
import { MyPage } from '@/components/common/types';

const NotFound404: MyPage = () => {
  return (
    <div className={cls.wrap}>
      <h1 className={cls.notFoundTitle}>404</h1>
      <p className={cls.notFoundSub}>Упс! Что-то пошло не так!</p>
      <Link className={cls.button} href={'/'}>
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

NotFound404.Layout = 'None';

export default NotFound404;
