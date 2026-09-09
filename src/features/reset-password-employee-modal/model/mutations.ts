import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import type { IUpdatePasswordEmployeeFields } from "./types";

import type { IApiResponse } from "@shared/types";

export function useResetPasswordEmployee() {
  const { message } = App.useApp();

  return {
    ...useMutation<
      unknown,
      AxiosError<IApiResponse<unknown>>, 
      IUpdatePasswordEmployeeFields
    >({
      mutationFn: api.resetPassword,
      onSuccess: () => {
        message.success('Parol yangilandi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Parolni yangilashda xatolik yuz berdi";
          
        message.error(msg);
      },
    })
  }
}