import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";

import { api } from "../api/api";

import { employeesKeys } from "@entities/employees";
import type { IApiResponse } from "@shared/types";

export const useDeleteAccess = () => {
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

      message.success("Administrator huquqlari bekor qilindi");
    },
    onError: (error) => {
      const msg =
        error.response?.data?.error?.message ??
        "Administrator huquqlarini bekor qilishda xatolik yuz berdi";

      message.error(msg);
    },
  });

  const confirmDelete = (id: number | string) => {
    modal.confirm({
      classNames: {
        wrapper: 'centered'
      },
      title: "Administrator huquqlarini bekor qilish kerakmi?",
      icon: <DeleteOutlined style={{ color: "#ff0000" }} />,
      okText: "O'chirish",
      cancelText: "Bekor qilish",
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