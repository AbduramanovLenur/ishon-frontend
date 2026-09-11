import { QueryCache, QueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import axios from 'axios';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data?.message || 'Maʼlumotlarni olishda xatolik yuz berdi');
  }

  return 'Maʼlumotlarni olishda xatolik yuz berdi';
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      message.error(getErrorMessage(error));
    },
  }),

  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});