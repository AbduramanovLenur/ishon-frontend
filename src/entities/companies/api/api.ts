import { axiosInstance } from "@shared/api";

import type { ICompany } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse, IPaginatedData } from "@shared/types";

export const api = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<ICompany>>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data.data);
  },
  getById: (companyId: string | number | null) => {
    return axiosInstance
      .get<IApiResponse<ICompany>>(endpoints.BY_ID, { params: {
        ...(companyId && { companyId })
      }})
      .then((response) => response.data.data)
  },
  manualList: () => {
    return axiosInstance
      .get<IApiResponse<ICompany[]>>(endpoints.MANUAL_LIST)
      .then((response) => response.data.data)
  }
}