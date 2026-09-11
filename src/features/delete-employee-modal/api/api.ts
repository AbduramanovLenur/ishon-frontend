import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  delete: (employeeId: string | number) => {
    return axiosInstance
      .delete<IApiResponse<null>>(endpoints.DELETE, { data: { employeeId }})
      .then((response) => response.data);
  }
}