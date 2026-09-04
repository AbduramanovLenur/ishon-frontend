import type { IObject } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse, IPaginatedData } from "@shared/types";
import { axiosInstance } from "@shared/api";

export const api = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<IObject>>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data.data)
  },
  getById: (objectId: string | number | null) => {
    return axiosInstance
      .get<IApiResponse<IObject>>(endpoints.BY_ID, { params: {
        ...(objectId && { objectId })
      }})
      .then((response) => response.data.data)
  }
}