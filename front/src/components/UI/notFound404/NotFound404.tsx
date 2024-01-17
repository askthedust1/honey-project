import React from 'react';
import Link from 'next/link';
import cls from '../../../styles/_notFound.module.scss';

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
