import { endpoints } from "./endpoints";
import type { IAttendanceFaceIdFields, IAttendanceResponse } from "../model/types";

import { axiosInstance } from "@shared/api";
import type { IApiResponse, IFile } from "@shared/types";

export const api = {
  uploadFacePicture: (values: FormData) => {
    return axiosInstance
      .post<IApiResponse<IFile>>(endpoints.FILE, values)
      .then((response) => response.data);
  },
  attendance: (values: IAttendanceFaceIdFields) => {
    return axiosInstance
      .post<IApiResponse<IAttendanceResponse>>(endpoints.ATTENDANCE, values)
      .then((response) => response.data);
  }
}