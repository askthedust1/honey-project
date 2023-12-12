import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { LoginMutation } from '@/types';
import { useRouter } from 'next/navigation';
import acc from '@/components/reg&logForms/form.module.scss';
import { login } from '@/features/users/usersThunk';
import { selectLoginError, selectLoginLoading } from "@/features/users/usersSlice";
import LoadingSpinnerBtn from "@/components/UI/LoadingSpinnerBtn/LoadingSpinnerBtn";

interface Props {
  containerRef?: React.RefObject<HTMLDivElement>;
}

const Login: React.FC<Props> = ({ containerRef }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const router = useRouter();

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
      await dispatch(login(state)).unwrap();
      router.push('/');
    } catch {
      // nothing
    }
  };

  return (
    <div className={acc.baseContainer} ref={containerRef}>
      <div className={acc.header}>Войти в аккаунт</div>
      <div className={acc.content}>
        {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error.error}</div>}
        <form className={acc.form} onSubmit={submitFormHandler}>
          <div className={acc.formGroup}>
            <label htmlFor="email">Email</label>
            <input onChange={inputChangeHandler} type="text" name="email" placeholder="Email" />
          </div>
          <div className={acc.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              onChange={inputChangeHandler}
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </div>
          <div className={acc.footer}>
            <button
              style={{ display: 'flex', alignItems: 'center' }}
              disabled={loading}
              type="submit"
              className={acc.btn}
            >
              {loading ? <LoadingSpinnerBtn /> : null}Войти в аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
