import { axiosInstance } from "@shared/api";

import type { IAuthResponse, IAuthFields } from "../model/types";
import { auth_endpoints } from "./authEndpoints";

export const authApi = {
  login: (values: IAuthFields) => {
    return axiosInstance
      .post<IAuthResponse>(auth_endpoints.LOGIN, values)
      .then((response) => response.data.data);
  }
}