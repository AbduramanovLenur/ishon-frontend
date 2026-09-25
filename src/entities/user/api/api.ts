import { endpoints } from "./endpoints";
import type { IUser } from "../model/types";

import { axiosInstance, hasValidSession } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  me: (signal?: AbortSignal) => {
    if (!hasValidSession()) {
      return Promise.reject(new Error("NO_SESSION"));
    }

    return axiosInstance
      .get<IApiResponse<IUser>>(endpoints.USER, { signal })
      .then((response) => response.data.data);
  }
}