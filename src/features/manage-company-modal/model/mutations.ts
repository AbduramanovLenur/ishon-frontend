import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";

import type { IManageCompanyFields } from "./types";
import { api } from "../api/api";

import { companiesKeys, type IApiResponse, type ICompany } from "@entities/companies";

export function useCreateCompany() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompany>, 
      AxiosError<IApiResponse<ICompany>>, 
      IManageCompanyFields
    >({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: companiesKeys.all
        });
        
        message.success('Kompaniya yaratildi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Kompaniya yaratishda xatolik yuz berdi";
          
        message.error(msg);
      },
    }),
  };
}

export function useUpdateCompany() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompany>, 
      AxiosError<IApiResponse<ICompany>>, 
      IManageCompanyFields
    >({
      mutationFn: api.update,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: companiesKeys.all
        });
        
        message.success('Kompaniya yangilandi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Kompaniya yangilashda xatolik yuz berdi";
          
        message.error(msg);
      },
    }),
  };
}