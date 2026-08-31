import { axiosInstance } from "@shared/api";

import type { ICompany, IPaginatedData } from "../model/types";
import { manageCompanyEndpoints } from "./companiesEndpoints";

export const companiesApi = {
  list: (search: string, page: number) => {
    return axiosInstance
      .get<IPaginatedData<ICompany>>(manageCompanyEndpoints.LIST, { params: {
        ...(search && { search }),
        ...(page && { page }),
      }})
      .then((response) => response.data);
  }
}