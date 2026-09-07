import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";

export const api = {
  delete: (companyId: string | number) => {
    return axiosInstance
      .delete(endpoints.DELETE, { data: { companyId }})
      .then((response) => response.data);
  }
}