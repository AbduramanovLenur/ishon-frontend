import type { IEmployee, IEmployeeDetails, IEmployeeEvent, IEmployeeLogin } from "../model/types";
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
      .then((response) => response.data.data);
  },
  username: (employeeId: string | number | null) => {
    return axiosInstance
      .get<IApiResponse<IEmployeeLogin>>(endpoints.LOGIN, { params: {
        ...(employeeId && { employeeId })
      }})
      .then((response) => response.data.data);
  },
  profile: (employeeId: string | number) => {
    return axiosInstance
      .get<IApiResponse<IEmployeeDetails>>(endpoints.PROFILE, { params: {
        ...(employeeId && { employeeId })
      }})
      .then((response) => response.data.data);
  },
  history: (
    employeeId: string | number,
    eventType: string,
    late: boolean | null,
    early: boolean | null,
    page: number
  ) => {
    return axiosInstance
      .get<IApiResponse<IPaginatedData<IEmployeeEvent>>>(endpoints.HISTORY, { params: {
        size: 10,
        ...(employeeId && { employeeId }),
        ...(eventType && { eventType }),
        ...(late !== null && { late }),
        ...(early !== null && { early }),
        ...(page && { page }),
      }})
      .then((response) => response.data.data)
  }
}