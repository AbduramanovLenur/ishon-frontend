import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";

import { employeesKeys } from "@entities/employees";
import type { IApiResponse } from "@shared/types";

export const useDeleteAccess = () => {
  const { t } = useTranslation();
  const { modal, message } = App.useApp();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    IApiResponse<null>,
    AxiosError<IApiResponse<null>>,
    number | string
  >({
    mutationFn: api.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeesKeys.collection()
      });

      message.success(t("employees.accessRevoked"));
    },
    onError: (error) => {
      const msg =
        error.response?.data?.error?.message ??
        t("employees.revokeAccessError");

      message.error(msg);
    },
  });

  const confirmDelete = (id: number | string) => {
    modal.confirm({
      classNames: {
        wrapper: 'centered'
      },
      title: t("employees.revokeAccessConfirmTitle"),
      icon: <DeleteOutlined style={{ color: "#ff0000" }} />,
      okText: t("common.delete"),
      cancelText: t("common.cancel"),
      okButtonProps: {
        loading: mutation.isPending
      },
      onOk: () => mutation.mutateAsync(id),
    });
  };

  return {
    confirmDelete,
  };
};
