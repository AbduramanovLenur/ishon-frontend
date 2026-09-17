import type { TRejectionReason } from "@shared/types";
import type { eventTypes } from "@shared/config";

export interface IAttendanceFaceIdFields {
  fileUrl: string;
  eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT | typeof eventTypes.NOT_CHECKED_IN>;
  latitude: number;
  longitude: number;
}

export interface IAttendanceResponse {
  eventId: string;
  accepted: boolean;
  rejectionReason: TRejectionReason;
  message: string;
  eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT | typeof eventTypes.NOT_CHECKED_IN>;
  eventTime: string;
  similarityPercentage: number;
  distanceMeters: number;
  inside: boolean;
}

export interface ISessionFields {
  companyToken: string;
  initData: string;
}

export interface ISessionResponse {
  companyId: string | number;
  companyName: string;
  accessToken: string;
  tokenType: string;
  expiresAt: string;
  expiresIn: number;
}