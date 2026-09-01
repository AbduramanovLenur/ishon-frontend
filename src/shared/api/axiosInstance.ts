import axios, { AxiosError } from 'axios';

import { env, routes } from '../config';
import { clearTokens, getAccessToken } from './tokenStorage';

export const axiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
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
      window.location.href = routes.AUTH;
    }

    return Promise.reject(error);
  },
);