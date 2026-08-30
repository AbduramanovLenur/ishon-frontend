import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { env } from '../config';
import { getAccessToken } from './tokenStorage';

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