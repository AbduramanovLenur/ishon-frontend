import type { IEmployeeCounts, IEmployeesResponse } from "../model/types";
import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse, TWorkStatus } from "@shared/types";

export const api = {
  list: (search: string, page: number, status: TWorkStatus) => {
    return axiosInstance
      .get<IApiResponse<IEmployeesResponse>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(status && { status })
      }})
      .then((response) => response.data.data)
  },
  listCount: () => {
    return axiosInstance
      .get<IApiResponse<IEmployeeCounts>>(endpoints.LIST_COUNT)
      .then((response) => response.data.data)
  }
}