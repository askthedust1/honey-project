import React from 'react';
import cls from '../../../styles/notFound.module.scss';
import Link from 'next/link';

const NotFound404 = () => {
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

export default NotFound404;
