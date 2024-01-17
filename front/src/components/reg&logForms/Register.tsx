import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useTranslation } from 'next-i18next';
import { register } from '@/features/users/usersThunk';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { selectCart } from '@/features/cart/cartSlice';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import { RegisterMutation } from '@/types';
import acc from '@/styles/_form.module.scss';

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
            <label htmlFor="username">{t('name')}*</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="displayName"
              placeholder={t('name')}
            />
            {error && <span className={acc.error}>{getFieldError('displayName')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="password">{t('password')}*</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="password"
              placeholder={t('password')}
            />
            {error && <span className={acc.error}>{getFieldError('password')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="passwordConfirm">{t('passwordConfirm')}*</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="passwordConfirm"
              placeholder={t('passwordConfirm')}
            />
            {error && <span className={acc.error}>{error.error}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="email"
              placeholder="example@gmail.com"
            />
            {error && <span className={acc.error}>{getFieldError('email')}</span>}
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="phone">{t('phone')}*</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="phone"
              placeholder="0555555555"
            />
            {error && <span className={acc.error}>{getFieldError('phone')}</span>}
          </div>
          <div className={acc.footer}>
            <ButtonUi
              id={'regBtn'}
              type={'submit'}
              btn={acc.btn}
              text={t('register')}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
