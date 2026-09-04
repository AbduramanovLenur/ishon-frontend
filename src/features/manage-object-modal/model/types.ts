import type { TStatus } from "@shared/types";

interface IBaseFields {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  geofenceRadiusMeters: number;
  shiftStartTime: string;
  shiftEndTime: string;
  lateEntryGraceMinutes: number;
  earlyLeaveGraceMinutes: number;
}

export interface IManageObjectFields extends IBaseFields {
  status: boolean;
}

export type TCreateObjectFields = IBaseFields;

export interface IUpdateObjectFields extends IBaseFields {
  objectId: string | number;
  status: TStatus;
}

export interface IState {
  isOpen: boolean;
  objectId: number | string | null;
}