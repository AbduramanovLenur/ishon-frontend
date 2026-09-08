import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";

export const api = {
  delete: (employeeId: string | number) => {
    return axiosInstance
      .delete(endpoints.DELETE, { data: { employeeId }})
      .then((response) => response.data);
  }
}