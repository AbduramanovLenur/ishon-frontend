import type { IGrantAccessFields } from "../model/types";
import { endpoints } from "./endpoints";

import type { IEmployeeAdmin } from "@entities/employees";
import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  grant_access: (values: IGrantAccessFields) => {
    return axiosInstance
      .post<IApiResponse<IEmployeeAdmin>>(endpoints.GRANT_ACCESS, values)
      .then((response) => response.data)
  }
}