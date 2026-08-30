import { axiosInstance } from "@shared/api";

import type { IApiResponse, ICompany, IManageCompanyFields, IPaginatedData } from "../model/types";
import { manageCompanyEndpoints } from "./manageCompanyEndpoints";

export const manageCompanyApi = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IPaginatedData<ICompany>>(manageCompanyEndpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data);
  },
  create: (values: IManageCompanyFields) => {
    return axiosInstance
      .post<IApiResponse<ICompany>>(manageCompanyEndpoints.CREATE, values)
      .then((response) => response.data);
  }
}