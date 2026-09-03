import { DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import { companiesKeys } from "@entities/companies";

import type { IApiResponse } from "@shared/types";

export const useDeleteCompany = () => {
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
        queryKey: companiesKeys.all,
      });

      message.success("Kompaniya o'chirildi");
    },
    onError: (error) => {
      const msg =
        error.response?.data?.error?.message ??
        "Kompaniyani o'chirishda xatolik yuz berdi";

      message.error(msg);
    },
  });

  const confirmDelete = (id: number | string) => {
    modal.confirm({
      classNames: {
        wrapper: 'centered'
      },
      title: "Kompaniyani o'chirish kerakmi?",
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