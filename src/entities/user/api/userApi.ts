import { axiosInstance } from "@shared/api";

import { userEndpoints } from "./userEndpoints";
import type { IUserResponse } from "../model/types";

export const userApi = {
  me: () => {
    return axiosInstance
      .get<IUserResponse>(userEndpoints.USER)
      .then((response) => response.data.data);
  }
}