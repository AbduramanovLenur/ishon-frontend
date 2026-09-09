import type { IEmployee } from "../model/types";
import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse, IPaginatedData } from "@shared/types";

export const api = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<IEmployee>>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data.data);
  },
  getById: (employeeId: string | number | null) => {
    return axiosInstance
      .get<IApiResponse<IEmployee>>(endpoints.BY_ID, { params: {
        ...(employeeId && { employeeId })
      }})
      .then((response) => response.data.data)
  },
}