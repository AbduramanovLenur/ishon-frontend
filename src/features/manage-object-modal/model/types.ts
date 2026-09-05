import type { TStatus } from "@shared/types";
import type { Dayjs } from "dayjs";

interface IBaseFields {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  geofenceRadiusMeters: number;
  lateEntryGraceMinutes: number;
  earlyLeaveGraceMinutes: number;
}

export interface IManageObjectFields extends IBaseFields {
  status: boolean;
  shiftStartTime: Dayjs;
  shiftEndTime: Dayjs;
}

export interface ICreateObjectFields extends IBaseFields {
  shiftStartTime: string;
  shiftEndTime: string;
};

export interface IUpdateObjectFields extends IBaseFields {
  shiftStartTime: string;
  shiftEndTime: string;
  objectId: string | number;
  status: TStatus;
}

export interface IState {
  isOpen: boolean;
  objectId: number | string | null;
}