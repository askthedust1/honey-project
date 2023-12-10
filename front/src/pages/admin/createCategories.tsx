import React, { ChangeEvent, useState } from 'react';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { createCategory } from '@/features/adminCategories/adminCategoriesThunk';
import cls from '@/styles/_createCategories.module.scss';
import { ICategoryMutation } from '@/types';
import { selectErrorsCategoriesAdmin } from '@/features/adminCategories/adminCategoriesSlice';
import { MyPage } from '@/components/common/types';

const CreateCategories: MyPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectErrorsCategoriesAdmin);

  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    titleRU: '',
    titleEN: '',
    titleKG: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const categoryMutation: ICategoryMutation = {
        translations: {
          en: {
            title: state.titleEN,
          },
          ru: {
            title: state.titleRU,
          },
          kg: {
            title: state.titleKG,
          },
        },
        image: file ? file : null,
      };

      await dispatch(createCategory(categoryMutation)).unwrap();
      await router.push('/admin/categories');
    } catch {
      // nothing
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <ProtectedRoute>
      <div className={cls.createCategory}>
        <h2>Форма создания категории</h2>
        <form className={cls.createCategory_form} onSubmit={submitFormHandler}>
          <div>
            <span className={cls.langSpan}>EN</span>
            <input
              className={cls.createCategory_input}
              placeholder="Название на EN"
              name="titleEN"
              value={state.titleEN}
              onChange={inputChangeHandler}
            />
            {Boolean(getFieldError('translations.en.title')) && (
              <span className={cls.field_error}>Некорректные данные EN</span>
            )}
          </div>

          <div>
            <span className={cls.langSpan}>RU</span>
            <input
              className={cls.createCategory_input}
              placeholder="Название на RU"
              name="titleRU"
              value={state.titleRU}
              onChange={inputChangeHandler}
            />
            {Boolean(getFieldError('translations.ru.title')) && (
              <span className={cls.field_error}>Некорректные данные RU</span>
            )}
          </div>

          <div>
            <span className={cls.langSpan}>KG</span>
            <input
              className={cls.createCategory_input}
              placeholder="Название на KG"
              name="titleKG"
              value={state.titleKG}
              onChange={inputChangeHandler}
            />
            {Boolean(getFieldError('translations.kg.title')) && (
              <span className={cls.field_error}>Некорректные данные KG</span>
            )}
          </div>

          <input
            className={cls.createCategory_fileInput}
            type="file"
            name="file"
            id="fileCategory"
            onChange={onChangeFile}
          />
          <label className={cls.createCategory_fileInputLabel} htmlFor="fileCategory">
            {file ? (
              <img src={file ? URL.createObjectURL(file) : ''} alt="" />
            ) : (
              <span
                style={{
                  color: Boolean(getFieldError('image')) ? 'red' : 'rgba(90, 55, 51, 0.25)',
                }}
              >
                {Boolean(getFieldError('image'))
                  ? 'Некорректное изображение'
                  : 'Загрузить изображение'}
              </span>
            )}
          </label>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

CreateCategories.Layout = 'Admin';

export default CreateCategories;
