import { endpoints } from "./endpoints";

import type { IApiResponse } from "@shared/types";
import { axiosInstance } from "@shared/api";

export const api = {
  delete: (companyOwnerId: string | number) => {
    return axiosInstance
      .delete<IApiResponse<null>>(endpoints.DELETE, { data: { companyOwnerId }})
      .then((response) => response.data);
  }
}