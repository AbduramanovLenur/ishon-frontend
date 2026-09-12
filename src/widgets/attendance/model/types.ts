import type { eventTypes } from "@shared/config";

export interface IAttendanceFields {
  eventType: Exclude<(typeof eventTypes)[keyof typeof eventTypes], typeof eventTypes.NOT_LEFT>;
  photo: File | null;
  latitude: number | null;
  longitude: number | null;
}