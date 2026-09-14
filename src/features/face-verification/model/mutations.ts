import { App } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { api } from "../api/api";
import type { IAttendanceFaceIdFields, IAttendanceResponse, ISessionFields, ISessionResponse } from "./types";

import type { IApiResponse, IFile } from "@shared/types";
import { eventTypes, rejectionReasons } from "@shared/config";
import { setTokens } from "@shared/api";

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
        const rejectionReason = response.data.rejectionReason;

        if (rejectionReason === null) {
          if (!response.success) {
            return;
          }

          if (variables.eventType === eventTypes.ENTER) {
            message.success(
              "Ishga xush kelibsiz! Ish kuningiz samarali va omadli o‘tsin."
            );
          }

          if (variables.eventType === eventTypes.EXIT) {
            message.success(
              "Ish kuningiz yakunlandi. Xayrli dam oling!"
            );
          }

          return;
        }

        switch (rejectionReason) {
          case rejectionReasons.FACE_NOT_DETECTED:
            message.error(
              "Xodim aniqlanmadi. Yuz tasviri orqali xodimni aniqlab bo‘lmadi."
            );
            break;
          case rejectionReasons.FACE_NOT_RECOGNIZED:
            message.error(
              "Yuz tasviri xodim bilan yetarlicha mos kelmadi. Iltimos, yuzingizni kameraga to‘g‘ri qarating va qayta urinib ko‘ring."
            );
            break;
          case rejectionReasons.OUTSIDE_GEOFENCE:
            message.error(
              "Siz ish obyektidan tashqaridasiz. Davomatni qayd etish uchun obyekt hududiga kiring."
            );
            break;
          case rejectionReasons.OBJECT_NOT_ASSIGNED:
            message.error(
              "Sizga ish obyekti biriktirilmagan. Iltimos, administrator bilan bog‘laning."
            );
            break;
          case rejectionReasons.NOT_WORKING_DAY:
            message.error(
              "Bugun sizning ish kuningiz emas."
            );
            break;
          case rejectionReasons.ALREADY_INSIDE:
            message.error(
              "Siz allaqachon ishga kirganingizni qayd etgansiz."
            );
            break;
          case rejectionReasons.NOT_INSIDE:
            message.error(
              "Siz ishga kirganingizni qayd etmagansiz. Chiqishni qayd etish mumkin emas."
            );
            break;
        }
    } ,
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
          setTokens({ accessToken: response.data.accessToken });
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