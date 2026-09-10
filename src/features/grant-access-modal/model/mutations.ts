import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { IUpdateAccessFields } from "./types";
import { api } from "../api/api";

import { employeesKeys, type IEmployeeAdmin } from "@entities/employees";
import type { IApiResponse } from "@shared/types";

export function useGrantAccess() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IApiResponse<IEmployeeAdmin>,
      AxiosError<IApiResponse<IEmployeeAdmin>>,
      IUpdateAccessFields
    >({
      mutationFn: api.grantAccess,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.byId(variables.employeeId)
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.collection()
        });

        message.success('Kirish huquqlari muvaffaqiyatli berildi');
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Kirish huquqlarini berishda xatolik yuz berdi";
          
        message.error(msg);
      },
    })
  }
}