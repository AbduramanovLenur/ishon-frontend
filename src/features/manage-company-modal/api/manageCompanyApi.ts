import { axiosInstance } from "@shared/api";

import type { IManageCompanyFields } from "../model/types";
import { manageCompanyEndpoints } from "./manageCompanyEndpoints";

import type { IApiResponse, ICompany } from "@entities/companies";

export const manageCompanyApi = {
  create: (values: IManageCompanyFields) => {
    return axiosInstance
      .post<IApiResponse<ICompany>>(manageCompanyEndpoints.CREATE, values)
      .then((response) => response.data);
  }
}