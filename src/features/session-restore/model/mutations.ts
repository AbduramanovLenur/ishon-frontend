import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import type { IRefreshResponse } from "./types";

import { setTokens } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export function useSessionRestore() {
  return {
    ...useMutation<
      IApiResponse<IRefreshResponse>, 
      AxiosError<IApiResponse<IRefreshResponse>>, 
      void
    >({
      mutationFn: () => api.session(),
      onSuccess: (response) => {
        if (response.success) {
          setTokens({ accessToken: response.data.accessToken });
        }
      },
    })
  };
}