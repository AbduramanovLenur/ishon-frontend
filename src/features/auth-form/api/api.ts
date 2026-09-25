import type { IAuthFields, IAuthData } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse } from "@shared/types";
import { axiosInstance } from "@shared/api";

export const api = {
  login: (values: IAuthFields) => {
    return axiosInstance
      .post<IApiResponse<IAuthData>>(endpoints.LOGIN, values)
      .then((response) => response.data.data);
  },
  logout: () => {
    return axiosInstance
      .post(endpoints.LOGOUT, undefined, { skipAuthRedirect: true })
      .then((response) => response.data);
  }
}