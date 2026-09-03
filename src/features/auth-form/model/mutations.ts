import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";
import { useNavigate } from "react-router-dom";

import { api } from "../api/api";
import type { IAuthData, IAuthFields } from "./types";

import { userKeys } from "@entities/user";
import { clearTokens, setTokens } from "@shared/api";
import { routes } from "@shared/config";
import type { IApiResponse } from "@shared/types";

export function useLogin() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return {
    ...useMutation<
      IAuthData, 
      AxiosError<IApiResponse<IAuthData>>, 
      IAuthFields
    >({
      mutationFn: api.login,
      onSuccess: (data) => {
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
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    clearTokens();
    queryClient.removeQueries({ queryKey: userKeys.user });
    navigate(routes.AUTH, { replace: true });
    message.success("Siz akkauntdan chiqdingiz");
  };

  return { logout };
}