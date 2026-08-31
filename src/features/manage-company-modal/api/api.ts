import { axiosInstance } from "@shared/api";

import type { IManageCompanyFields, IUpdateCompanyFields } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse, ICompany } from "@entities/companies";

export const api = {
  create: (values: IManageCompanyFields) => {
    return axiosInstance
      .post<IApiResponse<ICompany>>(endpoints.CREATE, values)
      .then((response) => response.data);
  },
  update: (values: IUpdateCompanyFields) => {
    return axiosInstance
      .patch<IApiResponse<ICompany>>(endpoints.UPDATE, values)
      .then((response) => response.data);
  },
}