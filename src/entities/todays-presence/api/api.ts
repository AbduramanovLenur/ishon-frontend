import type { IEmployeeCounts, IEmployeesResponse } from "../model/types";
import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse, TWorkStatus } from "@shared/types";

export const api = {
  list: (search: string, page: number, status: TWorkStatus, objectId: number | string, date: string) => {
    return axiosInstance
      .get<IApiResponse<IEmployeesResponse>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(status && { status }),
        ...(objectId && { objectId }),
        ...(date && { date })
      }})
      .then((response) => response.data.data)
  },
  collectionCount: (date: string) => {
    return axiosInstance
      .get<IApiResponse<IEmployeeCounts>>(endpoints.LIST_COUNT, { params: {
        ...(date && { date })
      }})
      .then((response) => response.data.data)
  },
  excel: (status: TWorkStatus, objectId: number | string, date: string, search: string) => {
    return axiosInstance
      .get<Blob>(endpoints.EXCEL, {
        params: {
          ...(status && { status }),
          ...(objectId && { objectId }),
          ...(date && { date }),
          ...(search && { search }),
        },
        responseType: 'blob'
      })
      .then((response) => response.data)
  }
}