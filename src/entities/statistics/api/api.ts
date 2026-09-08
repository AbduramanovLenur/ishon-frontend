import type { IAttendanceChart, IAttendanceStatistics } from "../model/types";
import { endpoints } from "./endpoints";

import type { IApiResponse, TPeriod } from "@shared/types";
import { axiosInstance } from "@shared/api";

export const api = {
  statistics: () => {
    return axiosInstance
      .get<IApiResponse<IAttendanceStatistics>>(endpoints.STATISTICS)
      .then((response) => response.data.data)
  },
  chart: (period: TPeriod) => {
    return axiosInstance
      .get<IApiResponse<IAttendanceChart>>(endpoints.CHART, { params: {
        ...(period && { period }),
      }})
      .then((response) => response.data.data)
  }
}