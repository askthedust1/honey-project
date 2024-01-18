import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';
import { IProductMutationNew, IProductOneView, IProductView, ValidationError } from '@/types';

export const fetchProductsForAdmin = createAsyncThunk<
  IProductView[],
  { id?: string; search?: string }
>('adminProducts/fetchAdmin', async ({ search, id }) => {
  const searchQuery = search ? `search=${search}&` : '';
  const categoryQuery = id ? `category=${id}&` : '';
  const productsResponse = await axiosApi.get<IProductView[]>(
    `/admin/?${categoryQuery}${searchQuery}`,
  );
  return productsResponse.data;
});

export const fetchOneProductForAdmin = createAsyncThunk<IProductOneView, string>(
  'adminProducts/fetchOneByAdmin',
  async (id) => {
    const productResponse = await axiosApi.get<IProductOneView>(`/admin/${id}`);
    return productResponse.data;
  },
);

export const fetchProductsAnalyticsAdmin = createAsyncThunk<IProductView[]>(
  'adminProducts/fetchAnalyticsAdmin',
  async () => {
    const productsResponse = await axiosApi.get<IProductView[]>(`/admin/click`);
    return productsResponse.data;
  },
);

export const patchActiveProducts = createAsyncThunk<void, string>(
  'adminProducts/patchProducts',
  async (id) => {
    await axiosApi.patch(`/admin/${id}`);
  },
);

export const patchHitProducts = createAsyncThunk<void, string>(
  'adminProducts/patchHitProducts',
  async (id) => {
    await axiosApi.patch(`/admin/${id}/hit`);
  },
);

export const createProduct = createAsyncThunk<
  void,
  IProductMutationNew,
  { rejectValue: ValidationError }
>('adminProducts/createProduct', async (productMutation, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('translations', JSON.stringify(productMutation.translations));

  formData.append('category', productMutation.category);
  formData.append('oldPrice', productMutation.oldPrice.toString());
  formData.append('actualPrice', productMutation.actualPrice.toString());
  formData.append('amount', productMutation.amount.toString());

  if (productMutation.image) {
    formData.append('image', productMutation.image);
  }
  try {
    await axiosApi.post('/admin', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const putProduct = createAsyncThunk<void, IProductMutationNew>(
  'adminProducts/editProduct',
  async (productMutation) => {
    const formData = new FormData();
    formData.append('translations', JSON.stringify(productMutation.translations));

    formData.append('category', productMutation.category);
    formData.append('oldPrice', productMutation.oldPrice.toString());
    formData.append('actualPrice', productMutation.actualPrice.toString());
    formData.append('amount', productMutation.amount.toString());

    if (productMutation.image) {
      formData.append('image', productMutation.image);
    }

    try {
      await axiosApi.put(`/admin/${productMutation._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      throw e;
    }
  },
);
