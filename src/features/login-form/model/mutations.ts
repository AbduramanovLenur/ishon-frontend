import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { notification } from "antd";

import { authApi } from "../api/authApi";

import { setTokens } from "@shared/api";

import type { IAuthData, IAuthFields, IAuthResponse } from "../model/types";

export function useLogin() {
  const [api, contextHolder] = notification.useNotification();

  return {
    ...useMutation<IAuthData, AxiosError<IAuthResponse>, IAuthFields>({
      mutationFn: authApi.login,
      onSuccess: (data) => {
        setTokens({ accessToken: data.accessToken });
        api.success({
          title: "Tizimga muvaffaqiyatli kirdingiz",
          description: `Xush kelibsiz ${data.user.fullName}! Tizimdan foydalanishni boshlashingiz mumkin.`
        });
      },
      onError: (error) => {
        const message =
          error.response?.data?.error?.message ??
          "Kirishda xatolik yuz berdi. Qayta urinib ko'ring.";

          api.error({
          title: "Xatolik",
          description: message
        });
      },
    }),
    contextHolder,
  };
}