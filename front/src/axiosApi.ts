import axios, { AxiosHeaders } from 'axios';
import { apiUrl } from '@/constants';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    return config;
  });
};

const axiosApi = axios.create({
  baseURL: apiUrl,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default axiosApi;
