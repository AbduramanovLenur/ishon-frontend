import axios, { AxiosError } from 'axios';

import i18n from '../config/i18n';
import { env } from '../config';
import type { TUnauthorizedHandler } from '../types';
import { getAccessToken } from './tokenStorage';

let unauthorizedHandler: TUnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: TUnauthorizedHandler): void {
  unauthorizedHandler = handler;
}

export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  config.headers['Accept-Language'] = i18n.language;

  return config;
});

axiosInstance.interceptors.response.use((response) => response,
  (error: AxiosError) => {
    const skipAuthRedirect = error.config?.skipAuthRedirect;

    if (error.response?.status === 401 && !skipAuthRedirect) {
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  },
);
