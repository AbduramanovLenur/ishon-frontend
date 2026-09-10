import { endpoints } from "./endpoints";
import type { IFile } from "../types/file";

import { axiosInstance } from "@shared/api";
import type { IApiResponse } from "@shared/types";

export const api = {
  upload: (values: FormData) => {
    return axiosInstance
      .post<IApiResponse<IFile>>(endpoints.FILE, values)
      .then((response) => response.data);
  }
}