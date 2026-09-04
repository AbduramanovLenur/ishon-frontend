import type { IObject } from "@entities/objects";

import type { IUpdateObjectFields, TCreateObjectFields } from "../model/types";
import { endpoints } from "./endpoints";

import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  create: (values: TCreateObjectFields) => {
    return axiosInstance
      .post<IApiResponse<IObject>>(endpoints.CREATE, values)
      .then((response) => response.data)
  },
  update: (values: IUpdateObjectFields) => {
    return axiosInstance
      .patch<IApiResponse<IObject>>(endpoints.UPDATE, values)
      .then((response) => response.data);
  }
}