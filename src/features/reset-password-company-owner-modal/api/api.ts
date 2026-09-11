import { endpoints } from "./endpoints";
import type { IUpdatePasswordCompanyOwnerFields } from "../model/types";

import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  resetPassword: (values: IUpdatePasswordCompanyOwnerFields) => {
    return axiosInstance
      .patch<IApiResponse<null>>(endpoints.RESET_PASSWORD, values)
      .then((response) => response.data)
  },
}