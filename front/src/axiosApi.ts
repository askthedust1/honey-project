import axios from 'axios';
import { apiUrl } from '@/constants';

const axiosApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept-Language': 'ru',
  },
});

export default axiosApi;
