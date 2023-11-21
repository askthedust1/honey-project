import axios, {AxiosHeaders} from 'axios';
import { apiUrl } from '@/constants';
import {RootState} from "@/store/store";
import {Store} from "redux";

const axiosApi = axios.create({
  baseURL: apiUrl,
  // headers: {
  //   'Accept-Language': 'ru',
  // },
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const lang = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Accept-Language', lang);
    return config;
  });
};

export default axiosApi;
