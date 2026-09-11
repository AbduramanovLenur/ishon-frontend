import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  delete: (companyId: string | number) => {
    return axiosInstance
      .delete<IApiResponse<null>>(endpoints.DELETE, { data: { companyId }})
      .then((response) => response.data);
  }
}