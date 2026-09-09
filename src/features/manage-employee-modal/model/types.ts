import type { TDays, TStatus } from "@shared/types";
import type { UploadFile } from "antd";

export interface IBaseFields {
  fullName: string;
  position: string;
  phone: string;
  assignedObjectId: string | number;
  workingDays: TDays[];
}

export interface IManageEmployeeFields extends IBaseFields {
  status: boolean;
  image: UploadFile[];
}

export interface ICreateEmployeeFields extends IBaseFields {
  image: File;
}

export interface IUpdateEmployeeFields extends IBaseFields {
  employeeId: string | number;
  image: File;
  status: TStatus;
}

export interface IState {
  isOpen: boolean;
  employeeId: number | string | null;
}