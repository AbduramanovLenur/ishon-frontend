import type { IUpdatePasswordEmployeeFields } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse } from "@shared/types";
import { axiosInstance } from "@shared/api";

export const api = {
  resetPassword: (values: IUpdatePasswordEmployeeFields) => {
    return axiosInstance
      .patch<IApiResponse<null>>(endpoints.RESET_PASSWORD, values)
      .then((response) => response.data);
  }
}