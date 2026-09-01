import { axiosInstance } from "@shared/api";

import type { IUpdateCompanyFields, TCreateCompanyFields } from "../model/types";
import { endpoints } from "./endpoints";

import type { ICompany } from "@entities/companies";
import type { IApiResponse } from "@shared/types";

export const api = {
  create: (values: TCreateCompanyFields) => {
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