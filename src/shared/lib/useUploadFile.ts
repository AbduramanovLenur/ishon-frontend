import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import type { IApiResponse, IFile } from "../types";

export function useUploadFile() {
  const { message } = App.useApp();

  return {
    ...useMutation<
      IApiResponse<IFile>,
      AxiosError<IApiResponse<IFile>>,
      FormData
    >({
      mutationFn: api.upload,
      onSuccess: (response) => {
        if (response.success) {
          message.success("Fayl yuklandi");
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Faylni yuklashda xatolik yuz berdi";

        message.error(msg);
      },
    }),
  };
}
