import { endpoints } from "./endpoints";
import type { IAttendanceFaceIdFields, IAttendanceResponse, ISessionFields, ISessionResponse } from "../model/types";

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
  },
  session: (values: ISessionFields) => {
    return axiosInstance
      .post<IApiResponse<ISessionResponse>>(endpoints.SESSION, values)
      .then((response) => response.data);
  },
}