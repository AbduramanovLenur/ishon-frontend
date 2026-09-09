import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { IGrantAccessFields } from "./types";
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
      IGrantAccessFields
    >({
      mutationFn: api.grant_access,
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: employeesKeys.byId(variables.employeeId)
        });
        queryClient.invalidateQueries({
          queryKey: employeesKeys.all
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