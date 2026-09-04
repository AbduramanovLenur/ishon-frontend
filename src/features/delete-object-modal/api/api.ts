import { axiosInstance } from "@shared/api";
import { endpoints } from "./endpoints";

export const api = {
  delete: (objectId: string | number) => {
    return axiosInstance
      .delete(endpoints.DELETE, { data: { objectId }})
      .then((response) => response.data);
  }
}