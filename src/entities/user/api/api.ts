import { axiosInstance } from "@shared/api";

import { endpoints } from "./endpoints";
import type { IUser } from "../model/types";

import type { IApiResponse } from "@shared/types";

export const api = {
  me: () => {
    return axiosInstance
      .get<IApiResponse<IUser>>(endpoints.USER)
      .then((response) => response.data.data);
  }
}