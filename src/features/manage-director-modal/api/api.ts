import type { ICreateCompanyOwnerFields, IUpdateCompanyOwnerFields } from "../model/types";
import { endpoints } from "./endpoints";

import type { ICompanyOwner } from "@entities/directors";
import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  create: (values: ICreateCompanyOwnerFields) => {
    return axiosInstance
      .post<IApiResponse<ICompanyOwner>>(endpoints.CREATE, values)
      .then((response) => response.data)
  },
  update: (values: IUpdateCompanyOwnerFields) => {
    return axiosInstance
      .patch<IApiResponse<ICompanyOwner>>(endpoints.UPDATE, values)
      .then((response) => response.data);
  }
}