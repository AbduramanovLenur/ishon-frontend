import { axiosInstance } from "@shared/api";
import { endpoints } from "./endpoints";

export const api = {
  delete: (companyOwnerId: string | number) => {
    return axiosInstance
      .delete(endpoints.DELETE, { data: { companyOwnerId }})
      .then((response) => response.data);
  }
}