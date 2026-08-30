import { axiosInstance } from "@shared/api";

import type { IAuthResponse, IAuthFields } from "../model/types";
import { auth_endpoints } from "./authEndpoints";

export const authApi = {
  login: async (values: IAuthFields) => {
    try {
      const response = await axiosInstance.post<IAuthResponse>(auth_endpoints.LOGIN, values);

      return response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}