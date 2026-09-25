import { endpoints } from "./endpoints";
import type { IRefreshResponse } from "../model/types";

import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  session: () => {
    return axiosInstance
      .post<IApiResponse<IRefreshResponse>>(endpoints.SESSION, undefined, {
        skipAuthRedirect: true
      })
      .then((response) => response.data);
  },
}