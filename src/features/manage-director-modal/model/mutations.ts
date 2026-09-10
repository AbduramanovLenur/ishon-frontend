import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import type { ICreateCompanyOwnerFields, IUpdateCompanyOwnerFields } from "./types";

import { companiesOwnerKeys, type ICompanyOwner } from "@entities/directors";
import type { IApiResponse } from "@shared/types";

export function useCreateCompanyOwner () {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompanyOwner>, 
      AxiosError<IApiResponse<ICompanyOwner>>, 
      ICreateCompanyOwnerFields
    >({
      mutationFn: api.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: companiesOwnerKeys.collection()
        });
        
        message.success('Direktor yaratildi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Direktorni yaratishda xatolik yuz berdi";
          
        message.error(msg);
      },
    }),
  };
}

export function useUpdateCompanyOwner() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompanyOwner>, 
      AxiosError<IApiResponse<ICompanyOwner>>, 
      IUpdateCompanyOwnerFields
    >({
      mutationFn: api.update,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: companiesOwnerKeys.collection()
        });
        queryClient.invalidateQueries({
          queryKey: companiesOwnerKeys.byId(variables.companyOwnerId)
        });
        
        message.success('Direktor yangilandi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Direktorni yangilashda xatolik yuz berdi";
          
        message.error(msg);
      },
    }),
  };
}