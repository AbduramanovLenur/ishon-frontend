import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";

import { api } from "../api/api";

import { employeesKeys, type IEmployee } from "@entities/employees";
import type { IApiResponse } from "@shared/types";

export function useCreateEmployee() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IEmployee>, 
      AxiosError<IApiResponse<IEmployee>>, 
      FormData
    >({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.all
        });
        
        message.success('Xodim yaratildi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Xodim yaratishda xatolik yuz berdi";
          
        message.error(msg);
      },
    }),
  };
}

export function useUpdateEmployee() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IEmployee>, 
      AxiosError<IApiResponse<IEmployee>>, 
      {
        employeeId: string | number;
        formData: FormData;
      }
    >({
      mutationFn: ({ formData }) => api.update(formData),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.byId(variables.employeeId)
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.all
        });
        
        message.success('Xodim yangilandi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Xodim yangilashda xatolik yuz berdi";
          
        message.error(msg);
      },
    }),
  };
}