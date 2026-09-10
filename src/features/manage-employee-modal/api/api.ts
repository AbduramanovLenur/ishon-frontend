import { endpoints } from "./endpoints";
import type { ICreateEmployeeFields, IUpdateEmployeeFields } from "../model/types";

import type { IEmployee } from "@entities/employees";
import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  create: (values: ICreateEmployeeFields) => {
    return axiosInstance
      .post<IApiResponse<IEmployee>>(endpoints.CREATE, values)
      .then((response) => response.data);
  },
  update: (values: IUpdateEmployeeFields) => {
    return axiosInstance
      .patch<IApiResponse<IEmployee>>(endpoints.UPDATE, values)
      .then((response) => response.data);
  },
}