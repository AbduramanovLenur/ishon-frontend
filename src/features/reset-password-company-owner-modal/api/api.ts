
import { endpoints } from "./endpoints";
import type { IUpdatePasswordCompanyOwnerPayload } from "../model/types";

import { axiosInstance } from "@shared/api";

export const api = {
  resetPassword: (values: IUpdatePasswordCompanyOwnerPayload) => {
    return axiosInstance
      .patch(endpoints.RESET_PASSWORD, values)
      .then((response) => response.data)
  },
}