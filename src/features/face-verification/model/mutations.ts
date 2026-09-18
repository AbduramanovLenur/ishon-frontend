import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

import { api } from "../api/api";
import type { IAttendanceFaceIdFields, IAttendanceResponse, ISessionFields, ISessionResponse } from "./types";

import type { IApiResponse, IFile } from "@shared/types";
import { eventTypes, rejectionReasons } from "@shared/config";
import { setTokens } from "@shared/api";

export function useUploadFacePicture() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return {
    ...useMutation<
      IApiResponse<IFile>,
      AxiosError<IApiResponse<IFile>>,
      FormData
    >({
      mutationFn: api.uploadFacePicture,
      onSuccess: (response) => {
        if (response.success) {
          message.success(t("faceVerification.fileUploaded"));
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("faceVerification.fileUploadError");

        message.error(msg);
      },
    }),
  };
}

export function useAttendance() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return {
    ...useMutation<
      IApiResponse<IAttendanceResponse>,
      AxiosError<IApiResponse<IAttendanceResponse>>,
      IAttendanceFaceIdFields
    >({
      mutationFn: api.attendance,
      onSuccess: (response, variables) => {
        const rejectionReason = response.data.rejectionReason;

        if (rejectionReason === null) {
          if (!response.success) {
            return;
          }

          if (variables.eventType === eventTypes.ENTER) {
            message.success(t("faceVerification.welcome"));
          }

          if (variables.eventType === eventTypes.EXIT) {
            message.success(t("faceVerification.goodbye"));
          }

          return;
        }

        switch (rejectionReason) {
          case rejectionReasons.FACE_NOT_DETECTED:
            message.error(t("faceVerification.faceNotDetected"));
            break;
          case rejectionReasons.FACE_NOT_RECOGNIZED:
            message.error(t("faceVerification.faceNotRecognized"));
            break;
          case rejectionReasons.OUTSIDE_GEOFENCE:
            message.error(t("faceVerification.outsideGeofence"));
            break;
          case rejectionReasons.OBJECT_NOT_ASSIGNED:
            message.error(t("faceVerification.objectNotAssigned"));
            break;
          case rejectionReasons.NOT_WORKING_DAY:
            message.error(t("faceVerification.notWorkingDay"));
            break;
          case rejectionReasons.ALREADY_INSIDE:
            message.error(t("faceVerification.alreadyInside"));
            break;
          case rejectionReasons.NOT_INSIDE:
            message.error(t("faceVerification.notInside"));
            break;
          case rejectionReasons.OUTSIDE_ATTENDANCE_WINDOW:
            message.error(t("faceVerification.outsideAttendanceWindow"));
            break;
          case rejectionReasons.ALREADY_COMPLETED_TODAY:
            message.error(t("faceVerification.alreadyCompletedToday"));
            break;
          case rejectionReasons.TOO_FREQUENT_REQUEST:
            message.error(t("faceVerification.tooFrequentRequest"));
            break;
        }
    },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("faceVerification.attendanceError");

        message.error(msg);
      },
    }),
  };
}

export function useSession() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  return {
    ...useMutation<
      IApiResponse<ISessionResponse>,
      AxiosError<IApiResponse<ISessionResponse>>,
      ISessionFields
    >({
      mutationFn: api.session,
      onSuccess: (response) => {
        if (response.success) {
          message.success(t("faceVerification.sessionSuccess"));
          setTokens({ accessToken: response.data.accessToken });
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          t("faceVerification.sessionError");

        message.error(msg);
      },
    }),
  };
}
