import { axiosInstance } from "@shared/api";
import type { IApiResponse, IPaginatedData } from "@shared/types";

import { endpoints } from "./endpoints";
import type { IEmployeeEvent } from "../model/types";

export const api = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<IEmployeeEvent>>>(endpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data.data)
  }
}