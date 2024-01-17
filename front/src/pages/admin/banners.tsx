import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Head from 'next/head';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import {
  selectBannerError,
  selectBanners,
  selectBannersPutLoading,
} from '@/features/banners/bannersSlice';
import { fetchBannersAdmin, putBanners } from '@/features/banners/bannersThunk';
import { fetchCategories } from '@/features/categories/categoriesThunk';
import { selectCategories } from '@/features/categories/categoriesSlice';
import FileUpload from '@/components/UI/FileUpload/FileUpload';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { IBannerPost } from '@/types';
import cls from '@/styles/_bannersAdmin.module.scss';

const BannersAdminPage: MyPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const banners = useAppSelector(selectBanners);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectBannersPutLoading);
  const error = useAppSelector(selectBannerError);
  const [state, setState] = useState<IBannerPost>({
    translations: 'ru',
    description: '',
    image: null,
    priority: '',
    page: '',
  });

  useEffect(() => {
    dispatch(fetchBannersAdmin(state.translations));
    dispatch(fetchCategories('ru'));
  }, [dispatch, state.translations]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(putBanners(state)).unwrap();
      setState({
        translations: 'ru',
        description: '',
        image: null,
        priority: '',
        page: '',
      });
      router.reload();
    } catch (e) {
      //
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
        <Head>
          <title>Баннеры</title>
        </Head>
        <h2>Предпросмотр баннера</h2>
        <ImageSlider images={banners} width={1000} />
        <h2 className={cls.addTitle}>Добавить баннер</h2>
        <div className={cls.wrapperBottom}>
          <div className={cls.formWrap}>
            <p className={cls.formTitle}>Выберите язык баннеров:</p>
            <select
              className={cls.lang_select}
              onChange={inputChangeHandler}
              value={state.translations}
              name="translations"
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
              <option value="kg">KG</option>
            </select>
          </div>
          <form onSubmit={submitFormHandler}>
            {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error.error}</div>}
            <div className={cls.formWrap}>
              <label className={cls.formTitle} htmlFor="priority">
                Выберите очередность баннера*:
              </label>
              <select
                defaultValue=""
                required
                className={cls.select}
                onChange={inputChangeHandler}
                name="priority"
              >
                <option value="" disabled>
                  Выберите очередность:
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className={cls.formWrap}>
              <label className={cls.formTitle} htmlFor="page">
                Выберите перенаправление на страницу:
              </label>
              <select
                defaultValue=""
                required
                className={cls.select}
                onChange={inputChangeHandler}
                name="page"
              >
                <option value="" disabled>
                  Выберите страницу:
                </option>
                <option value="/products/page/1">Товары</option>
                <option value="/about">О нас</option>
                <option value="/delivery">Доставка</option>
                <option value="/products/page/1?promotion=promotion">Акции</option>
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={`category/page/path?cId=${category._id}&cPage=1`}
                  >
                    {category.title}
                  </option>
                ))}
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
              <p className={cls.formTitle}>Загрузите изображение с разрешением 1014px х 520px:</p>
              <FileUpload onChange={filesInputChangeHandler} name="image" label="image" />
            </div>
            <div className={cls.formWrpBtn}>
              <ButtonUi text="Отправить" loading={loading} type={'submit'} btn={cls.formBtn} />
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

BannersAdminPage.Layout = 'Admin';

export default BannersAdminPage;
