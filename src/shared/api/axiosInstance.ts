import axios, { AxiosError } from 'axios';

import i18n from '../config/i18n';
import { env, routes } from '../config';
import { insideTelegram } from '../lib/telegram';
import { clearTokens, getAccessToken } from './tokenStorage';

export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  config.headers['Accept-Language'] = i18n.language;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearTokens();

      if (insideTelegram) {
        window.location.reload();
      } else {
        window.location.href = routes.AUTH;
      }
    }

    return Promise.reject(error);
  },
);