import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";
import { useNavigate } from "react-router-dom";

import { authApi } from "../api/authApi";

import { clearTokens, setTokens } from "@shared/api";

import type { IAuthData, IAuthFields, IAuthResponse } from "./types";

import { routes } from "@shared/config";
import { userKeys } from "@entities/user";

export function useLogin() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return {
    ...useMutation<IAuthData, AxiosError<IAuthResponse>, IAuthFields>({
      mutationFn: authApi.login,
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries({
          queryKey: userKeys.user,
        });
        setTokens({ accessToken: data.accessToken });
        message.success(`Xush kelibsiz ${data.user.fullName}!`);

        navigate(routes.HOME);
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Kirishda xatolik yuz berdi. Qayta urinib ko'ring.";
          
        message.error(msg);
      },
    }),
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    clearTokens();
    queryClient.removeQueries({ queryKey: userKeys.user });
    navigate(routes.AUTH, { replace: true });
  };

  return { logout };
}