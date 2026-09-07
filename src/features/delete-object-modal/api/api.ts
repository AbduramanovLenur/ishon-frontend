import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";

export const api = {
  delete: (objectId: string | number) => {
    return axiosInstance
      .delete(endpoints.DELETE, { data: { objectId }})
      .then((response) => response.data);
  }
}