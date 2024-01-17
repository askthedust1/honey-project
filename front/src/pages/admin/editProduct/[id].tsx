import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAdminCategories } from '@/features/adminCategories/adminCategoriesThunk';
import { selectAdminCategories } from '@/features/adminCategories/adminCategoriesSlice';
import { selectOneProductForAdmin } from '@/features/productAdmin/productsAdminSlice';
import { fetchOneProductForAdmin, putProduct } from '@/features/productAdmin/productsAdminThunk';
import ProtectedRoute from '@/components/UI/protectedRoute/ProtectedRoute';
import { MyPage } from '@/components/common/types';
import { apiUrl } from '@/constants';
import { IProductMutationNew } from '@/types';
import cls from '@/styles/_editProduct.module.scss';

const EditProduct: MyPage = () => {
  const { id } = useParams() || {};
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProductForAdmin);
  const router = useRouter();
  const categories = useAppSelector(selectAdminCategories);
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
    image: '',
    _id: '',
  });

  useEffect(() => {
    if (id) {
      if (typeof id === 'string') {
        dispatch(fetchOneProductForAdmin(id));
      }
    }
    dispatch(fetchAdminCategories(''));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setState((prevState) => ({
        ...prevState,
        titleEN: product.translations.en.title || '',
        titleRU: product.translations.ru.title || '',
        titleKG: product.translations.kg.title || '',
        descriptionEN: product.translations.en.description || '',
        descriptionRU: product.translations.ru.description || '',
        descriptionKG: product.translations.kg.description || '',
        amount: product.amount || 0,
        oldPrice: product.oldPrice || 0,
        actualPrice: product.actualPrice || 0,
        category: product.category ? product.category._id || '' : '',
        image: product.image || '',
        _id: product._id || '',
      }));
    }
  }, [product]);

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
      category: categoryId,
    }));
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let idNew: string = '';
      if (typeof id === 'string') {
        idNew = id;
      }
      const productMutation: IProductMutationNew = {
        _id: idNew,
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

      await dispatch(putProduct(productMutation)).unwrap();
      await router.push('/admin/products');
    } catch {
      // nothing
    }
  };

  return (
    <ProtectedRoute>
      <div className={cls.createCategory}>
        <Head>
          <title>Редактировать продукт</title>
        </Head>
        <Link className={cls.back} href={`/admin/products/`}>
          Назад
        </Link>
        <h2>Редактировать продукт</h2>
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
              <select onChange={handleCategoryChange} value={state.category}>
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
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
            <div className={cls.currentImg}>
              <h4>Нынешнее изображение </h4>
              <div className={cls.imgBlock}>
                <Image
                  style={{ width: '250px', height: '250px', objectFit: 'contain' }}
                  width={100}
                  height={100}
                  src={apiUrl + '/' + state.image}
                  className={cls.product_media_wrapper}
                  alt={'Продукция Aman Kyrgyz Honey'}
                />
              </div>
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
                  <Image
                    style={{ width: '250px', height: '250px', objectFit: 'contain' }}
                    width={100}
                    height={100}
                    priority
                    quality={80}
                    className={cls.img}
                    src={file ? URL.createObjectURL(file) : ''}
                    alt="img"
                  />
                ) : (
                  <span>Загрузить изображение</span>
                )}
              </label>
            </div>
          </div>
          <button type="submit">Редактировать продукт</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};
EditProduct.Layout = 'Admin';
export default EditProduct;
