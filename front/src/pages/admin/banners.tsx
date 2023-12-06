import React, { useState } from 'react';
import { MyPage } from '@/components/common/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { selectBanners } from '@/features/banners/bannersSlice';
import { fetchBanners } from '@/features/banners/bannersThunk';
import { wrapper } from '@/store/store';
import axiosApi from '@/axiosApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageSwitcher from '@/components/UI/langSwitcher/LanguageSwitcher';
import { IBannerPost } from '@/types';
import FileUpload from '@/components/UI/FileUpload/FileUpload';
import cls from '@/styles/_bannersAdmin.module.scss';

const BannersAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanners);
  const [state, setState] = useState<IBannerPost>({
    description: '',
    image: null,
    priority: '',
    page: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await dispatch((state)).unwrap();
    } catch (e) {
      alert('Invalid field');
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <ProtectedRoute>
      <div className={cls.wrapper}>
        <h2>Предпросмотр баннера</h2>
        <ImageSlider images={banners} width={'1000px'} />
        <h2 className={cls.addTitle}>Добавить баннер</h2>
        <div className={cls.wrapperBottom}>
          <div className={cls.formWrap}>
            <p className={cls.formTitle}>Выберите язык баннеров:</p>
            <LanguageSwitcher />
          </div>
          <form onSubmit={submitFormHandler}>
            <div className={cls.formWrap}>
              <label className={cls.formTitle} htmlFor="priority">
                Выберите очедность баннера:
              </label>
              <select className={cls.select} onChange={inputChangeHandler} name="priority">
                <option disabled>Выберите очедность:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className={cls.formWrap}>
              <label className={cls.formTitle} htmlFor="page">
                Выберите перенаправление на страницу:
              </label>
              <select className={cls.select} onChange={inputChangeHandler} name="page">
                <option disabled>Выберите станицу:</option>
                <option value="/products/page/1">Товары</option>
                <option value="/about">О нас</option>
                <option value="/">Конструктор наборов</option>
                <option value="/delivery">Доставка</option>
              </select>
            </div>
            <div className={cls.formWrap}>
              <label className={cls.formTitle} htmlFor="description">
                Добавьте описание:
              </label>
              <input
                className={cls.formInput}
                onChange={inputChangeHandler}
                type="text"
                name="description"
              />
            </div>
            <div>
              <p className={cls.formTitle}>Загрузите изображение с разрешением 1624px х 698px:</p>
              <FileUpload onChange={filesInputChangeHandler} name="image" label="image" />
            </div>
            <div className={cls.formWrp}>
              <button className={cls.formBtn} type="submit">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

BannersAdminPage.Layout = 'Admin';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  axiosApi.defaults.headers.common['Accept-Language'] = locale ?? 'ru';

  await store.dispatch(fetchBanners());

  return {
    props: {
      name: 'Products',
      ...(await serverSideTranslations(locale ?? 'ru', ['common', 'home', 'header', 'footer'])),
    },
  };
});

export default BannersAdminPage;
