import type { TStatus } from "@shared/types";

export interface IObject {
  objectId: string;
  companyId: string;
  name: string;
  status: TStatus;
  address: string;
  latitude: string;
  longitude: string;
  geofenceRadiusMeters: number;
  shiftStartTime: string;
  shiftEndTime: string;
  lateEntryGraceMinutes: number;
  earlyLeaveGraceMinutes: number;
  createdAt: string;
  updatedAt: string;
}