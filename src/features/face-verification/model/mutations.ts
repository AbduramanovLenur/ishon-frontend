import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import type { IAttendanceFaceIdFields, IAttendanceResponse, ISessionFields, ISessionResponse } from "./types";

import type { IApiResponse, IFile } from "@shared/types";
import { eventTypes } from "@shared/config";

export function useUploadFacePicture() {
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
          message.success("Fayl yuklandi");
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Faylni yuklashda xatolik yuz berdi";

        message.error(msg);
      },
    }),
  };
}

export function useAttendance() {
  const { message } = App.useApp();

  return {
    ...useMutation<
      IApiResponse<IAttendanceResponse>,
      AxiosError<IApiResponse<IAttendanceResponse>>,
      IAttendanceFaceIdFields
    >({
      mutationFn: api.attendance,
      onSuccess: (response, variables) => {
        if (!response.success) { 
          return; 
        }

        if (variables.eventType === eventTypes.ENTER) { 
          message.success("Ishga xush kelibsiz! Ish kuningiz samarali va omadli o'tsin."); 
        }

        if (variables.eventType === eventTypes.EXIT) { 
          message.success("Ish kuningiz yakunlandi. Xayrli dam oling!"); 
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Davomatni qayd etishda xatolik yuz berdi";

        message.error(msg);
      },
    }),
  };
}

export function useSession() {
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
          message.success("Sessiya muvaffaqiyatli o‘rnatildi");
        }
      },
      onError: (error) => {
        const msg =
          error.response?.data?.error?.message ??
          "Sessiyani o‘rnatishda xatolik yuz berdi";

        message.error(msg);
      },
    }),
  };
}