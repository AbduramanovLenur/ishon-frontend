import { endpoints } from "./endpoints";
import type { IEmployeeEvent } from "../model/types";

import { axiosInstance } from "@shared/api";
import type { IApiResponse, IPaginatedData } from "@shared/types";

export const api = {
  list: (search: string, page: number, objectId: number | string, from: string, to: string) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<IEmployeeEvent>>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
        ...(objectId && { objectId }),
        ...(from && { from }),
        ...(to && { to }),
      }})
      .then((response) => response.data.data)
  },
  excel: (search: string, objectId: number | string, fromDate: string, toDate: string) => {
    return axiosInstance
      .get<Blob>(endpoints.EXCEL, {
        params: {
          ...(search && { search }),
          ...(objectId && { objectId }),
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
        },
        responseType: 'blob'
      })
      .then((response) => response.data)
  }
}