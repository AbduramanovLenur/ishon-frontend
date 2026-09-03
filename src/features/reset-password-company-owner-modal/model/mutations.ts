import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";
import type { IApiResponse } from "@shared/types";

import { api } from "../api/api";
import type { IUpdatePasswordCompanyOwnerPayload } from "./types";

export function useResetPasswordCompanyOwner() {
  const { message } = App.useApp();

  return {
    ...useMutation<
      unknown,
      AxiosError<IApiResponse<unknown>>, 
      IUpdatePasswordCompanyOwnerPayload
    >({
      mutationFn: api.resetPassword,
      onSuccess: () => {
        message.success('Parol yangilandi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Kompaniya yangilashda xatolik yuz berdi";
          
        message.error(msg);
      },
    })
  }
}