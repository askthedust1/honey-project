import React, { ChangeEvent, useEffect, useState } from 'react';
import cls from '@/styles/_addNewProductForm.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { IProductMutationNew } from '@/types';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { fetchAdminCategories } from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import { createProduct } from '@/features/productAdmin/productsAdminThunk';
import ButtonUi from '@/components/UI/ButtonUI/ButtonUI';
import { selectCreateProductsLoading } from '@/features/productAdmin/productsAdminSlice';
import Head from 'next/head';

const AddProductForm: MyPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categories = useAppSelector(selectAdminCategories);
  const loading = useAppSelector(selectCreateProductsLoading);
  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    titleEN: '',
    titleRU: '',
    titleKG: '',
    descriptionEN: '',
    descriptionRU: '',
    descriptionKG: '',
    amount: 0,
    oldPrice: 0,
    actualPrice: 0,
    category: '',
  });

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    setState((prevState) => ({
      ...prevState,
      category: categoryId, // Обновляем только поле категории в состоянии
    }));
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const productMutation: IProductMutationNew = {
        category: state.category,
        amount: state.amount,
        oldPrice: state.oldPrice,
        actualPrice: state.actualPrice,
        translations: {
          en: {
            title: state.titleEN,
            description: state.descriptionEN,
          },
          ru: {
            title: state.titleRU,
            description: state.descriptionRU,
          },
          kg: {
            title: state.titleKG,
            description: state.descriptionKG,
          },
        },
        image: file ? file : null,
      };

      await dispatch(createProduct(productMutation)).unwrap();
      await router.push('/admin/products');
    } catch {
      // nothing
    }
  };

  return (
    <ProtectedRoute>
      <div className={cls.createCategory}>
        <Head>
          <title>Создать новый продукт</title>
        </Head>
        <h2>Создать новый продукт</h2>
        <form className={cls.createCategory_form} onSubmit={submitFormHandler}>
          <div className={cls.nameProductsBlock}>
            <h4>Название продукта</h4>
            <div>
              <span className={cls.langSpan}>EN</span>
              <input
                className={cls.createCategory_input}
                placeholder="Название продукта английском"
                name="titleEN"
                value={state.titleEN}
                onChange={inputChangeHandler}
                style={{ width: '90%' }}
                required
              />
            </div>
            <div>
              <span className={cls.langSpan}>RU</span>
              <input
                className={cls.createCategory_input}
                placeholder="Название продукта на русском"
                name="titleRU"
                value={state.titleRU}
                onChange={inputChangeHandler}
                style={{ width: '90%' }}
                required
              />
            </div>
            <div>
              <span className={cls.langSpan}>KG</span>
              <input
                className={cls.createCategory_input}
                placeholder="Название продукта на кыргызском"
                name="titleKG"
                value={state.titleKG}
                onChange={inputChangeHandler}
                style={{ width: '90%' }}
                required
              />
            </div>
          </div>
          <div className={cls.textAreaBlocks}>
            <h4>Описание продукта</h4>
            <div>
              <span className={cls.langSpanText}>EN</span>
              <textarea
                className={cls.createCategory_input}
                placeholder="Описание продукта на английском"
                name="descriptionEN"
                value={state.descriptionEN}
                onChange={inputChangeHandler}
                style={{ width: '90%' }}
                required
              />
            </div>
            <div>
              <span className={cls.langSpanText}>RU</span>
              <textarea
                className={cls.createCategory_input}
                placeholder="Описание продукта на русском"
                name="descriptionRU"
                value={state.descriptionRU}
                onChange={inputChangeHandler}
                style={{ width: '90%' }}
                required
              />
            </div>
            <div>
              <p className={cls.langSpanText}>KG</p>
              <textarea
                className={cls.createCategory_input}
                placeholder="Описание продукта на кыргызском"
                name="descriptionKG"
                value={state.descriptionKG}
                onChange={inputChangeHandler}
                style={{ width: '90%' }}
                required
              />
            </div>
          </div>
          <div className={cls.bottomFormBlocks}>
            <div className={cls.detailsBlock}>
              <h4>Детали</h4>
              <select onChange={handleCategoryChange}>
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id} data-category-id={category._id}>
                    {category.translations.ru.title}
                  </option>
                ))}
              </select>
              <label htmlFor="amount">Количество товара</label>
              <input
                id="amount"
                className={cls.createCategory_input}
                type="number"
                name="amount"
                value={state.amount}
                onChange={inputChangeHandler}
                required
              />
              <label htmlFor="oldPrice"> Cтарая цена</label>
              <input
                id="oldPrice"
                className={cls.createCategory_input}
                type="number"
                name="oldPrice"
                value={state.oldPrice}
                onChange={inputChangeHandler}
                required
              />
              <label htmlFor="actualPrice"> Новая цена </label>
              <input
                id="actualPrice"
                className={cls.createCategory_input}
                type="number"
                name="actualPrice"
                value={state.actualPrice}
                onChange={inputChangeHandler}
                required
              />
            </div>

            <div className={cls.imageBlock}>
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
                  <span>Загрузить изображение</span>
                )}
              </label>
            </div>
          </div>
          <ButtonUi text="Создать новый продукт" loading={loading} type="submit" />
        </form>
      </div>
    </ProtectedRoute>
  );
};
AddProductForm.Layout = 'Admin';
export default AddProductForm;
