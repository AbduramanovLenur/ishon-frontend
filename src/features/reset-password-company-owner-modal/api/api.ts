import { endpoints } from "./endpoints";
import type { IUpdatePasswordCompanyOwnerFields } from "../model/types";

import { axiosInstance } from "@shared/api";

export const api = {
  resetPassword: (values: IUpdatePasswordCompanyOwnerFields) => {
    return axiosInstance
      .patch(endpoints.RESET_PASSWORD, values)
      .then((response) => response.data)
  },
}