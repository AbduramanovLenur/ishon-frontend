import { axiosInstance } from "@shared/api";

import { endpoints } from "./endpoints";
import type { IUserResponse } from "../model/types";

export const api = {
  me: () => {
    return axiosInstance
      .get<IUserResponse>(endpoints.USER)
      .then((response) => response?.data?.data);
  }
}