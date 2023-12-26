import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RegisterMutation } from '@/types';
import { register } from '@/features/users/usersThunk';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import acc from '@/styles/form.module.scss';
import { selectCart } from '@/features/cart/cartSlice';
import { useTranslation } from 'next-i18next';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';

interface Props {
  containerRef?: React.RefObject<HTMLDivElement>;
}

const Register: React.FC<Props> = ({ containerRef }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('account');
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const router = useRouter();
  const cartState = useAppSelector(selectCart);

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
    phone: '',
    address: '',
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
      cartState.length > 0 ? router.push('/order') : router.push('/');
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
      <div className={acc.header}>{t('regin')}</div>
      <div className={acc.content}>
        <form className={acc.form} onSubmit={submitFormHandler}>
          <div className={acc.formGroup}>
            <label htmlFor="username">Имя*</label>
            <input onChange={inputChangeHandler} type="text" name="displayName" placeholder="Имя" />
            {error && <span className={acc.error}>{getFieldError('displayName')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="password">{t('password')}*</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            {error && <span className={acc.error}>{getFieldError('password')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="passwordConfirm">{t('passwordConfirm')}*</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="passwordConfirm"
              placeholder="Повторите пароль"
            />
            {error && <span className={acc.error}>{error.error}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="email">Email*</label>
            <input onChange={inputChangeHandler} type="text" name="email" placeholder="Email" />
            {error && <span className={acc.error}>{getFieldError('email')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="phone">{t('phone')}*</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="phone"
              placeholder="Номер телефона"
            />
            {error && <span className={acc.error}>{getFieldError('phone')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="address">{t('address')}*</label>
            <input onChange={inputChangeHandler} type="text" name="address" placeholder="Адрес" />
            {error && <span className={acc.error}>{getFieldError('address')}</span>}
          </div>
          <div className={acc.footer}>
            <ButtonUi id={'regBtn'} type={'submit'} btn={acc.btn} text={t('register')} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
