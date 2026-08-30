import { axiosInstance } from "@shared/api";

import type { IAuthResponse, IAuthFields } from "../model/types";
import { authEndpoints } from "./authEndpoints";

export const authApi = {
  login: (values: IAuthFields) => {
    return axiosInstance
      .post<IAuthResponse>(authEndpoints.LOGIN, values)
      .then((response) => response.data.data);
  }
}