import axios, { AxiosError } from 'axios';

import { env, routes } from '../config';
import { insideTelegram } from '../lib/telegram';
import { clearTokens, getAccessToken } from './tokenStorage';

export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { 
    // 'Content-Type': 'application/json' 
    'Accept-Language': 'uz,ru;q=0.9,en;q=0.8'
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearTokens();

      if (!insideTelegram) {
        window.location.href = routes.AUTH;
      }
    }

    return Promise.reject(error);
  },
);