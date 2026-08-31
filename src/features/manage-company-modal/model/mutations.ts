import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";

import { manageCompanyApi } from "../api/manageCompanyApi";

import type { ICompany, IApiResponse, IManageCompanyFields } from "./types";
import { companiesKeys } from "@entities/companies";

export function useCreateCompany() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<ICompany>, 
      AxiosError<IApiResponse<ICompany>>, 
      IManageCompanyFields
    >({
      mutationFn: manageCompanyApi.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: companiesKeys.all
        });
        
        message.success('Kompaniya yaratildi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Kirishda xatolik yuz berdi. Qayta urinib ko'ring.";
          
        message.error(msg);
      },
    }),
  };
}