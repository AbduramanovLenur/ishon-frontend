import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";

export const api = {
  delete: (companyOwnerId: string | number) => {
    return axiosInstance
      .delete(endpoints.DELETE, { data: { companyOwnerId }})
      .then((response) => response.data);
  }
}