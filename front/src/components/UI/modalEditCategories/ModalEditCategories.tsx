import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Image from 'next/image';
import { fetchAdminCategories, putCategory } from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategoryInfo } from '@/features/adminCategories/adminCategoriesSlice';
import { apiUrl } from '@/constants';
import { ICategoryMutation } from '@/types';
import cls from '@/styles/_modalEditCategories.module.scss';

interface Props {
  isOpen: boolean;
  closeModalButton: React.MouseEventHandler<HTMLButtonElement>;
  closeModalAfterPut: (e: boolean) => void;
}

const ModalEditCategories: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const itemInfo = useAppSelector(selectAdminCategoryInfo);

  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    titleRU: '',
    titleEN: '',
    titleKG: '',
    image: '',
    _idCategory: '',
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      titleRU: itemInfo ? itemInfo.translations.ru.title : '',
      titleEN: itemInfo ? itemInfo.translations.en.title : '',
      titleKG: itemInfo ? itemInfo.translations.kg.title : '',
      image: itemInfo ? itemInfo.image : '',
      _idCategory: itemInfo ? itemInfo._id : '',
    }));
  }, [itemInfo]);

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
        idCategory: state._idCategory,
      };

      await dispatch(putCategory(categoryMutation)).unwrap();
      await dispatch(fetchAdminCategories(''));
      props.closeModalAfterPut(false);
      setFile(null);
    } catch {
      // nothing
    }
  };

  return (
    <div style={{ display: props.isOpen ? 'block' : 'none' }} className={cls.modalEdit}>
      <form onSubmit={submitFormHandler} className={cls.modalEdit_form}>
        <h2>Форма редактирования категории</h2>
        <div>
          <span className={cls.langSpan}>EN</span>
          <input
            required
            className={cls.modalEdit_input}
            placeholder="Название на EN"
            name="titleEN"
            value={state.titleEN}
            onChange={inputChangeHandler}
          />
        </div>

        <div>
          <span className={cls.langSpan}>RU</span>
          <input
            required
            className={cls.modalEdit_input}
            placeholder="Название на RU"
            name="titleRU"
            value={state.titleRU}
            onChange={inputChangeHandler}
          />
        </div>

        <div>
          <span className={cls.langSpan}>KG</span>
          <input
            required
            className={cls.modalEdit_input}
            placeholder="Название на KG"
            name="titleKG"
            value={state.titleKG}
            onChange={inputChangeHandler}
          />
        </div>

        <div className={cls.modalEdit_imagesBlock}>
          <Image
            src={apiUrl + '/' + state.image}
            alt="Изображение"
            style={{ objectFit: 'contain' }}
            width={260}
            height={260}
          />

          <input
            className={cls.modalEdit_fileInput}
            type="file"
            name="file"
            id="fileModuleCategory"
            onChange={onChangeFile}
          />
          <label className={cls.modalEdit_fileInputLabel} htmlFor="fileModuleCategory">
            {file ? (
              <Image
                src={file ? URL.createObjectURL(file) : ''}
                alt="Изображение"
                width={260}
                height={260}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <span>Загрузить новое изображение</span>
            )}
          </label>
        </div>
        <button type="submit">Редактировать</button>
        <span className={cls.modalEdit_closeButton} onClick={props.closeModalButton}></span>
      </form>
    </div>
  );
};

export default ModalEditCategories;
