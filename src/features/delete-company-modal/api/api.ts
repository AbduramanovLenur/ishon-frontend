import { axiosInstance } from "@shared/api";
import { companyEndpoints } from "./endpoints";

export const api = {
  delete: (companyId: string | number) => {
    return axiosInstance
      .delete(companyEndpoints.DELETE, { data: { companyId }})
      .then((response) => response.data);
  }
}