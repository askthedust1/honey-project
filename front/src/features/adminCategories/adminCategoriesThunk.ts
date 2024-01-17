import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '@/axiosApi';
import { RootState } from '@/store/store';
import { IAdminCategory, ICategoryMutation, TAdminCategory, ValidationError } from '@/types';

export const fetchAdminCategories = createAsyncThunk<
  IAdminCategory[],
  string,
  {
    state: RootState;
  }
>('adminCategories/fetchAdminCategories', async (search, thunkApi) => {
  const userState = thunkApi.getState().users;
  const token = userState.user?.token;
  const searchQuery = search ? `search=${search}&` : '';
  const response = await axiosApi.get(`/adminCategories/?${searchQuery}`, {
    headers: { Authorization: token },
  });
  return response.data;
});

export const patchCategory = createAsyncThunk<void, string, { state: RootState }>(
  'adminCategories/patchCategory',
  async (id, thunkApi) => {
    const usersState = thunkApi.getState().users;
    const token = usersState.user?.token;
    await axiosApi.patch(
      `/adminCategories/${id}`,
      { headers: { Authorization: token } },
      { headers: { Authorization: token } },
    );
  },
);

export const createCategory = createAsyncThunk<
  void,
  ICategoryMutation,
  { rejectValue: ValidationError }
>('adminCategories/createCategory', async (categoryMutation, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('translations', JSON.stringify(categoryMutation.translations));

  if (categoryMutation.image) {
    formData.append('image', categoryMutation.image);
  }

  try {
    await axiosApi.post('/adminCategories', formData, {
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

export const fetchOneCategoryForAdmin = createAsyncThunk<TAdminCategory | null, string>(
  'adminCategories/fetchOneCategoryByAdmin',
  async (id) => {
    const { data } = await axiosApi<IAdminCategory | null>(`/adminCategories/${id}`);

    if (data) {
      return {
        translations: data.translations,
        image: data.image,
        _id: data._id,
        isActive: data.isActive,
      };
    }

    return null;
  },
);

export const putCategory = createAsyncThunk<void, ICategoryMutation>(
  'adminCategories/putCategory',
  async (categoryMutation) => {
    const formData = new FormData();
    formData.append('translations', JSON.stringify(categoryMutation.translations));

    if (categoryMutation.image) {
      formData.append('image', categoryMutation.image);
    }

    try {
      await axiosApi.put(`/adminCategories/${categoryMutation.idCategory}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      throw e;
    }
  },
);
