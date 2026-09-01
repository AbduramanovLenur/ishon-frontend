import type { ICompanyOwner } from "../model/types";
import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse, IPaginatedData } from "@shared/types";

export const api = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<ICompanyOwner>>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data.data);
  },
  getById: (companyOwnerId: string | number | null) => {
    return axiosInstance
      .get<IApiResponse<ICompanyOwner>>(endpoints.BY_ID, { params: {
        ...(companyOwnerId && { companyOwnerId })
      }})
      .then((response) => response.data.data);
  }
}