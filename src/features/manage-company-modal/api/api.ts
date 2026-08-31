import { axiosInstance } from "@shared/api";

import type { IManageCompanyFields } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse, ICompany } from "@entities/companies";

export const api = {
  create: (values: IManageCompanyFields) => {
    return axiosInstance
      .post<IApiResponse<ICompany>>(endpoints.CREATE, values)
      .then((response) => response.data);
  }
}