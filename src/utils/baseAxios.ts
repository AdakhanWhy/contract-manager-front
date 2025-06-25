import axios from 'axios';
import { requestInterceptor } from './requestInterceptor';

export const baseAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

baseAxios.interceptors.request.use(requestInterceptor, error => Promise.reject(error as Error));