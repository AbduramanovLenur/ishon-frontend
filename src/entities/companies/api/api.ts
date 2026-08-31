import { axiosInstance } from "@shared/api";

import type { IApiResponse, ICompany, IPaginatedData } from "../model/types";
import { endpoints } from "./endpoints";

export const api = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IPaginatedData<ICompany>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data);
  },
  getById: (companyId: string | number | null) => {
    return axiosInstance
      .get<IApiResponse<ICompany>>(endpoints.BY_ID, { params: {
        ...(companyId && { companyId })
      }})
      .then((response) => response.data.data)
  }
}