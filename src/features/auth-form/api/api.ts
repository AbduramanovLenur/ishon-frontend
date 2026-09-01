import { axiosInstance } from "@shared/api";

import type { IAuthFields, IAuthData } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse } from "@shared/types";

export const api = {
  login: (values: IAuthFields) => {
    return axiosInstance
      .post<IApiResponse<IAuthData>>(endpoints.LOGIN, values)
      .then((response) => response.data.data);
  }
}