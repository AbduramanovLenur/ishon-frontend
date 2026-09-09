import type { IUpdatePasswordEmployeeFields } from "../model/types";
import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";

export const api = {
  resetPassword: (values: IUpdatePasswordEmployeeFields) => {
    return axiosInstance
      .patch(endpoints.RESET_PASSWORD, values)
      .then((response) => response.data);
  }
}