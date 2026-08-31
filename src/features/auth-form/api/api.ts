import { axiosInstance } from "@shared/api";

import type { IAuthResponse, IAuthFields } from "../model/types";
import { endpoints } from "./endpoints";

export const api = {
  login: (values: IAuthFields) => {
    return axiosInstance
      .post<IAuthResponse>(endpoints.LOGIN, values)
      .then((response) => response.data.data);
  }
}