import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RegisterMutation } from '@/types';
import { register } from '@/features/users/usersThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import acc from './form.module.scss';

interface Props {
  containerRef: React.RefObject<HTMLDivElement>;
}

const RegistrationPage: React.FC<Props> = ({ containerRef }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const router = useRouter();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
    phone: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      router.push('/');
    } catch (e) {
      // nothing
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };
  return (
    <div className={acc.baseContainer} ref={containerRef}>
      <div className={acc.header}>Регистрация</div>
      <div className={acc.content}>
        <form className={acc.form} onSubmit={submitFormHandler}>
          <div className={acc.formGroup}>
            <label htmlFor="username">Имя*</label>
            <input onChange={inputChangeHandler} type="text" name="displayName" placeholder="Имя" />
            {error && <span className={acc.error}>{getFieldError('displayName')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="password">Пароль*</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            {error && <span className={acc.error}>{getFieldError('password')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="password">Повторите пароль*</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="passwordConfirm"
              placeholder="Повторите пароль"
            />
            {error && <span className={acc.error}>{getFieldError('passwordConfirm')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="email">Email*</label>
            <input onChange={inputChangeHandler} type="text" name="email" placeholder="Email" />
            {error && <span className={acc.error}>{getFieldError('email')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="phone">Номер телефона*</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="phone"
              placeholder="Номер телефона"
            />
            {error && <span className={acc.error}>{getFieldError('phone')}</span>}
          </div>
          <div className={acc.footer}>
            <button disabled={loading} type="submit" className={acc.btn}>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
