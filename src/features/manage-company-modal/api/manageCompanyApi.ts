import { axiosInstance } from "@shared/api";

import type { IApiResponse, ICompany, IManageCompanyFields } from "../model/types";
import { manageCompanyEndpoints } from "./manageCompanyEndpoints";

export const manageCompanyApi = {
  create: (values: IManageCompanyFields) => {
    return axiosInstance
      .post<IApiResponse<ICompany>>(manageCompanyEndpoints.CREATE, values)
      .then((response) => response.data);
  }
}