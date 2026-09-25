import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IAuthData, IAuthFields } from "./types";

import { userKeys } from "@entities/user";
import { settingsKeys } from "@entities/settings";
import { employeesKeys } from "@entities/employees";
import { companiesKeys } from "@entities/companies";
import { companiesOwnerKeys } from "@entities/directors";
import { objectsKeys } from "@entities/objects";
import { statisticsKeys } from "@entities/statistics";
import { systemLogsKeys } from "@entities/system-logs";
import { todaysPresenceKeys } from "@entities/todays-presence";
import { clearTokens, setTokens } from "@shared/api";
import { routes } from "@shared/config";
import type { IApiResponse } from "@shared/types";

export function useLogin() {
  const { t } = useTranslation();
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

        message.success(t("authMutations.welcome", { name: data.user.fullName }));

        navigate(routes.HOME);
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("authMutations.loginError");

        message.error(msg);
      },
    }),
  };
}

export function useLogout() {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cleanup = () => {
    clearTokens();
    queryClient.removeQueries({ queryKey: userKeys.user });
    queryClient.removeQueries({ queryKey: settingsKeys.all });
    queryClient.removeQueries({ queryKey: employeesKeys.all });
    queryClient.removeQueries({ queryKey: companiesKeys.all });
    queryClient.removeQueries({ queryKey: companiesOwnerKeys.all });
    queryClient.removeQueries({ queryKey: objectsKeys.all });
    queryClient.removeQueries({ queryKey: statisticsKeys.all });
    queryClient.removeQueries({ queryKey: systemLogsKeys.all });
    queryClient.removeQueries({ queryKey: todaysPresenceKeys.all });
  };

  return {
    ...useMutation<void, AxiosError, void>({
      mutationFn: api.logout,
      onSuccess: () => {
        cleanup();
        navigate(routes.AUTH, { replace: true });
        message.success(t("authMutations.loggedOut"));
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("authMutations.logoutError");

        message.error(msg);
      },
    }),
  };
}
