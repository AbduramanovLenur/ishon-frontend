import type { eventTypes } from "@shared/config";

export interface IAttendanceFaceIdFields {
  fileUrl: string;
  eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT>;
  latitude: number;
  longitude: number;
}

export interface IAttendanceResponse {
  eventId: string;
  accepted: boolean;
  rejectionReason: string;
  message: string;
  eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT>;
  eventTime: string;
  similarityPercentage: number;
  distanceMeters: number;
  inside: boolean;
}