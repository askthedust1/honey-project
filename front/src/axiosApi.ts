import axios from 'axios';
import { apiUrl } from '@/constants';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export const setLangToAxios = (lang: string) => {
  axiosApi.defaults.headers.common['accept-language'] = lang;
};

export default axiosApi;
