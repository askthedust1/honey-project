import axios from 'axios';
import { apiUrl } from '@/constants';

const axiosApi = axios.create({
  baseURL: apiUrl,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default axiosApi;
