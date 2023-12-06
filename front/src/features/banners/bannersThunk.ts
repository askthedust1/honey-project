import { createAsyncThunk } from '@reduxjs/toolkit';
import { BannerResponse, GlobalError, IBanner, IBannerPost } from '@/types';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchBanners = createAsyncThunk<IBanner[]>('banner/fetchBanners', async () => {
  const response = await axiosApi.get<IBanner[]>('/banners');
  return response.data;
});

export const putBanners = createAsyncThunk<
  BannerResponse,
  IBannerPost,
  { rejectValue: GlobalError }
>('banner/put', async (bannerMutation: IBannerPost, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(bannerMutation) as (keyof IBannerPost)[];

    keys.forEach((key) => {
      const value = bannerMutation[key];

      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.put(`/banners/${bannerMutation.priority}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
