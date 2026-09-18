import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { ICreateCompanyOwnerFields, IUpdateCompanyOwnerFields } from "./types";

import { companiesOwnerKeys, type ICompanyOwner } from "@entities/directors";
import type { IApiResponse } from "@shared/types";

export function useCreateCompanyOwner () {
  const { t } = useTranslation();
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

        message.success(t("directors.created"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("directors.createError");

        message.error(msg);
      },
    }),
  };
}

export function useUpdateCompanyOwner() {
  const { t } = useTranslation();
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

        message.success(t("directors.updated"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("directors.updateError");

        message.error(msg);
      },
    }),
  };
}
